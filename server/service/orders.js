const database = require('../database/connection'); // Ensure this is the correct path to your database connection

const order = async (firstName, lastName, email, address, appartmentNumber, city, country, state, zipCode, phoneNumber) => {
    // Use parameterized query to avoid SQL injection
    const orderQuery = `
        INSERT INTO orders 
        (firstName, lastName, email, address, appartmentNumber, city, country, state, zipCode, phoneNumber, status) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    try {
        await database.query(orderQuery, [firstName, lastName, email, address, appartmentNumber, city, country, state, zipCode, phoneNumber]);
        return {message: "Order placed successfully"};
    } catch (err) {
        return {error: err.message};
    }
};

const getOrders = async () => {
    try {
        const orders = await database.query("SELECT * FROM orders");
        return orders[0];
    } catch (err) {
        return {error: err.message};
    }
};

const getOrdersByPhoneNumber = async (phoneNumber) => {
    try {
        const orders = await database.query("SELECT * FROM orders WHERE phoneNumber = ?", [phoneNumber]);
        return orders[0];
    } catch (err) {
        return {error: err.message};
    }
};

const removeOrderById = async (id) => {
    try {
        await database.query("DELETE FROM orders WHERE id = ?", [id]);
        return {message: "Order removed successfully"};
    } catch (err) {
        return {error: err.message};
    }
};

const removeOrderByPhoneNumber = async (phoneNumber) => {
    try {
        await database.query("DELETE FROM orders WHERE phoneNumber = ?", [phoneNumber]);
        return {message: "Order removed successfully"};
    } catch (err) {
        return {error: err.message};
    }
};

module.exports = {
    order,
    getOrders,
    getOrdersByPhoneNumber,
    removeOrderById,
    removeOrderByPhoneNumber
};
