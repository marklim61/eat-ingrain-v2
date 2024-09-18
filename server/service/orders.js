const connectionPool = require('../database/connection');

const order = async (firstName, lastName, email, address, appartmentNumber, city, country, state, zipCode, phoneNumber) => {
    const database = await connectionPool.getConnection();
    
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
    } finally {
        database.release();
    }
};

const getOrders = async () => {
    const database = await connectionPool.getConnection();

    try {
        const orders = await database.query("SELECT * FROM orders");
        return orders[0];
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
};

const getOrdersByPhoneNumber = async (phoneNumber) => {
    const database = await connectionPool.getConnection();

    try {
        const orders = await database.query("SELECT * FROM orders WHERE phoneNumber = ?", [phoneNumber]);
        return orders[0];
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
};

const removeOrderById = async (id) => {
    const database = await connectionPool.getConnection();

    try {
        await database.query("DELETE FROM orders WHERE id = ?", [id]);
        return {message: "Order removed successfully"};
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
};

const removeOrderByPhoneNumber = async (phoneNumber) => {
    const database = await connectionPool.getConnection();
    
    try {
        await database.query("DELETE FROM orders WHERE phoneNumber = ?", [phoneNumber]);
        return {message: "Order removed successfully"};
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
};

module.exports = {
    order,
    getOrders,
    getOrdersByPhoneNumber,
    removeOrderById,
    removeOrderByPhoneNumber
};
