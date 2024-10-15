const connectionPool = require("../database/connection");

// const createEvent = async (title, nameOfPlace, address, date, time, image, description) => {
//     const database = await connectionPool.getConnection();
//     // Use parameterized query to avoid SQL injection
//     const eventQuery = `
//         INSERT INTO events
//         (title, nameOfPlace, address, date, time, image, description)
//         VALUES
//         (?, ?, ?, ?, ?, ?, ?)
//     `;

//     try {
//         await database.query(eventQuery, [title, nameOfPlace, address, date, time, image, description]);
//         return {message: "Event created successfully"};
//     } catch (err) {
//         return {error: err.message};
//     } finally {
//         database.release();
//     }
// }

// this function returns the last ID in the events table
// orders the results in descending order by ID
const getLastEventId = async (database) => {
  const query = `SELECT id FROM events ORDER BY id DESC LIMIT 1`;
  const [result] = await database.query(query);
  return result.length > 0 ? result[0].id : 0; // return the last ID or 0 if the table is empty
};

// creates a new event in the mySQL database
const createEvent = async (title, address, date, time, image, description) => {
  const database = await connectionPool.getConnection(); // establishes connection to database using connectionPool.getConnection

  try {
    // retrives last existing event ID using the getLastEventId function
    const lastId = await getLastEventId(database);

    // sets the AUTO_INCREMENT to the next ID (lastId + 1)
    await database.query(`ALTER TABLE events AUTO_INCREMENT = ?`, [lastId + 1]);

    // insert the new event
    const eventQuery = `
            INSERT INTO events 
            (title, address, date, time, image, description) 
            VALUES 
            (?, ?, ?, ?, ?, ?)
        `;

    const [result] = await database.query(eventQuery, [
      title,
      address,
      date,
      time,
      image,
      description,
    ]);
    return {
      message: "Event created successfully", // if successful
      id: result.insertId, // retrieve and return the auto-generated ID
    };
  } catch (err) {
    return { error: err.message }; // if unsuccessful
  } finally {
    database.release(); // closes connection to database regardless of success or failure
  }
};

const getEvents = async () => {
  const database = await connectionPool.getConnection();
  try {
    const events = await database.query("SELECT * FROM events");
    // Reverse the order of the events to show the most recent first
    const reverseEvents = events[0].reverse();
    return reverseEvents;
  } catch (err) {
    return { error: err.message };
  } finally {
    database.release();
  }
};

const getPastEvents = async () => {
  const database = await connectionPool.getConnection();
  try {
    const events = await database.query(
      "SELECT * FROM events WHERE date < CURDATE()"
    );
    // Reverse the order of the events to show the most recent first
    const reverseEvents = events[0].reverse();
    return reverseEvents;
  } catch (err) {
    return { error: err.message };
  } finally {
    database.release();
  }
};

const getUpcomingEvents = async () => {
  const database = await connectionPool.getConnection();
  try {
    const events = await database.query(
      "SELECT * FROM events WHERE date >= CURDATE()"
    );
    return events[0];
  } catch (err) {
    return { error: err.message };
  } finally {
    database.release();
  }
};

// function to get first-time events
const getFirstTimeEvents = async () => {
  const database = await connectionPool.getConnection();
  try {
    const events = await database.query(
      "SELECT * FROM events WHERE firstTime = TRUE ORDER BY date DESC"
    );
    return events[0];
  } catch (err) {
    return { error: err.message };
  } finally {
    database.release();
  }
};

const getDuplicatesEvents = async () => {
  const database = await connectionPool.getConnection();
  try {
    const events = await database.query(
      "SELECT * FROM events WHERE firstTime = FALSE ORDER BY date DESC"
    );
    return events[0];
  } catch (err) {
    return { error: err.message };
  } finally {
    database.release();
  }
};

const updateEvent = async (id, updates = {}) => {
  // make sure id and updates are valid
  if (
    !id ||
    (typeof id !== "number" && typeof id !== "string") ||
    Object.keys(updates).length === 0
  ) {
    return { error: "Invalid ID or updates." };
  }

  const database = await connectionPool.getConnection();
  const queryParams = [...Object.values(updates), id]; // put 'id' last in queryParams

  // Create a string representing the fields to update in the query.
  const setClause = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");
  const query = `UPDATE events SET ${setClause} WHERE id = ?`;

  try {
    // execute the update query and capture the result
    const [result] = await database.query(query, queryParams);

    // check if any rows were affected
    if (result.affectedRows === 0) {
      return { error: "No event found with the given ID." };
    }

    return {
      message: "Event updated successfully",
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    console.error("Error updating event:", err.message); // log the error for debugging
    return { error: err.message };
  } finally {
    database.release();
  }
};

const deleteEvent = async (id) => {
  const database = await connectionPool.getConnection(); // establish connection
  try {
    // step 1: fetch the event to get the image associated with it
    const [event] = await database.query(
      "SELECT image from events where id = ?",
      [id]
    );

    if (event.length === 0) {
      throw new Error("Event no found");
    }

    const imageUrl = event[0].image; // assuming the image URL or key is stored in the 'image'column
    const imageKey = imageUrl.split("/").pop(); // assuming the file name is at the end of the URL

    // step 2: delet the event from the events table
    await database.query("DELETE FROM events WHERE id = ?", [id]);

    // step 3: renumber the IDs after deletion
    await database.query("SET @new_id = 0;"); // create a temporary variable
    await database.query(
      "UPDATE events SET id = (@new_id := @new_id + 1) ORDER BY id;"
    ); // renumber IDs

    // step 4: reset AUTO_INCREMENT to the correct value
    const [maxIdResult] = await database.query(
      "SELECT MAX(id) AS maxId FROM events;"
    );
    const maxId = maxIdResult[0].maxId || 0; // get the maximum ID or default to 0 if no events remain
    await database.query("ALTER TABLE events AUTO_INCREMENT = ?", [maxId + 1]); // set AUTO_INCREMENT to max ID + 1

    return {
      message: "Event deleted successfully and IDs renumbered successfully",
      imageKey,
    };
  } catch (err) {
    return { error: err.message };
  } finally {
    database.release(); // close the connection
  }
};

module.exports = {
  createEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvents,
  getFirstTimeEvents,
  getDuplicatesEvents,
  updateEvent,
  deleteEvent,
};
