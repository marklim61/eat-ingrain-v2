const connectionPool = require('../database/connection');

const createEvent = async (title, nameOfPlace, address, date, time, image, description) => {
    const database = await connectionPool.getConnection();
    // Use parameterized query to avoid SQL injection
    const eventQuery = `
        INSERT INTO events 
        (title, nameOfPlace, address, date, time, image, description) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        await database.query(eventQuery, [title, nameOfPlace, address, date, time, image, description]);
        return {message: "Event created successfully"};
    } catch (err) {
        return {error: err.message};    
    } finally {
        database.release();
    }
}

const getEvents = async () => {
    const database = await connectionPool.getConnection();
    try {
        const events = await database.query("SELECT * FROM events");
        // Reverse the order of the events to show the most recent first
        const reverseEvents = events[0].reverse();
        return reverseEvents;
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const getPastEvents = async () => {
    const database = await connectionPool.getConnection();
    try {
        const events = await database.query("SELECT * FROM events WHERE date < CURDATE()");
        // Reverse the order of the events to show the most recent first
        const reverseEvents = events[0].reverse();
        return reverseEvents;
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const getUpcomingEvents = async () => {
    const database = await connectionPool.getConnection();
    try {
        const events = await database.query("SELECT * FROM events WHERE date >= CURDATE()");
        return events[0];
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const updateEvent = async (id, updates = {}) => {
    const database = await connectionPool.getConnection();
    const queryParams = [id];

    // Create a string representing the fields to update in the query.
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE events SET ${setClause} WHERE id = ?`;

    try {
        await database.query(query, [...Object.values(updates), ...queryParams]);
        return {message: "Event updated successfully"};
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const deleteEvent = async (id) => {
    const database = await connectionPool.getConnection();
    try {
        await database.query("DELETE FROM events WHERE id = ?", [id]);
        return {message: "Event deleted successfully"};
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

module.exports = {
    createEvent,
    getEvents,
    getPastEvents,
    getUpcomingEvents,
    updateEvent,
    deleteEvent
}