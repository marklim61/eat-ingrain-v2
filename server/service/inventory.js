const connectionPool = require('../database/connection');

const createItem = async (productName, description, price, size, quantity) => {
    console.log(2);
    const database = await connectionPool.getConnection();
    const query = `
        INSERT INTO inventory 
        (productName, description, price, size, quantity) 
        VALUES 
        (?, ?, ?, ?, ?);
    `;
    try {
        await database.query(query, [productName, description, price, size, quantity]);
        return {message: "Item created successfully"};
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const getInventory = async () => {
    const database = await connectionPool.getConnection();
    const query = `SELECT * FROM inventory;`;
    try {
        const inventory = await database.query(query);
        return inventory[0];
    } catch (err) {
        return {error: err.message};    
    } finally {
        database.release();
    }
}

const getItemById = async (id) => {
    const database = await connectionPool.getConnection();
    const query = `SELECT * FROM inventory WHERE id = ?;`;
    try {
        const item = await database.query(query, [id]);
        return item[0];
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const getItemByProductName = async (productName) => {
    const database = await connectionPool.getConnection();
    const query = `SELECT * FROM inventory WHERE productName = ?;`;
    try {
        const inventory = await database.query(query, [productName]);
        return inventory[0];
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const updateItem = async (id, updates = {}) => {
    const database = await connectionPool.getConnection();
    const queryParams = [id];

    // Create a string representing the fields to update in the query.
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE inventory SET ${setClause} WHERE id = ?`;

    try {
        await database.query(query, [...Object.values(updates), ...queryParams]);
        return {message: "Item updated successfully"};
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const deleteItem = async (id) => {
    const database = await connectionPool.getConnection();
    query = `DELETE FROM inventory WHERE id = ?;`;
    try {
        await database.query(query, [id]);
        return {message: "Item deleted successfully"};
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

module.exports = { createItem, getInventory, getItemById, getItemByProductName, updateItem, deleteItem };
