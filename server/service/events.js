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

const updateEvent = async (id, title, nameOfPlace, address, date, time, image, description) => {
    // Use parameterized query to avoid SQL injection
    const eventQuery = `
        UPDATE events 
        SET title = ?, nameOfPlace = ?, address = ?, date = ?, time = ?, image = ?, description = ? 
        WHERE id = ?
    `;

    try {
        await database.query(eventQuery, [title, nameOfPlace, address, date, time, image, description, id]);
        return {message: "Event updated successfully"};
    } catch (err) {
        return {error: err.message};
    }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent
}