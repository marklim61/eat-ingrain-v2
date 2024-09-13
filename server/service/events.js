const database = require('../database/connection');

const createEvent = async (title, nameOfPlace, address, date, time, image, description) => {
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
    }
}

const getEvents = async () => {
    try {
        const events = await database.query("SELECT * FROM events");
        return events[0];
    } catch (err) {
        return {error: err.message};
    }
}

const updateEvent = async (id, updates = {}) => {
    const queryParams = [id];

    // Create a string representing the fields to update in the query.
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE events SET ${setClause} WHERE id = ?`;

    try {
        await database.query(query, [...Object.values(updates), ...queryParams]);
        return {message: "Event updated successfully"};
    } catch (err) {
        return {error: err.message};
    }
}

const deleteEvent = async (id) => {
    try {
        await database.query("DELETE FROM events WHERE id = ?", [id]);
        return {message: "Event deleted successfully"};
    } catch (err) {
        return {error: err.message};
    }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}