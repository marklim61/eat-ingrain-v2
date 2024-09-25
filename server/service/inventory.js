const connectionPool = require('../database/connection');

const createItems = async (productName, description, price, sizes = [], image) => {
    const database = await connectionPool.getConnection();
    const query = `
        INSERT INTO inventory 
        (productName, description, price, image) 
        VALUES 
        (?, ?, ?, ?);
    `;
    try {
        await database.beginTransaction();
        const [result] = await database.execute(query, [productName, description, price, image]);
        const productId = result.insertId;

        // Check if sizes is not empty before proceeding
        if (sizes.length > 0) {
            const sizeInsertQueries = sizes.map((size) => {
                const quantity = size.quantity || 1; // Default quantity if not provided

                // Treat all sizes as strings
                const sizeString = String(size.size); // Ensure size is a string

                return database.execute(
                    `INSERT INTO inventorySizes (productId, size, quantity)
                    VALUES (?, ?, ?)`, 
                    [productId, sizeString, quantity]
                );
            });

            await Promise.all(sizeInsertQueries);
        }

        await database.commit();
        return { message: "Item/s created successfully" };
    } catch (err) {
        await database.rollback(); // Rollback transaction on error
        return { error: err.message };
    } finally {
        database.release();
    }
};


const getInventory = async () => {
    const database = await connectionPool.getConnection();
    const query = `
        SELECT 
            i.id, 
            i.productName, 
            i.price, 
            i.description, 
            i.image,
            s.size,
            s.quantity
        FROM 
            inventory i
        LEFT JOIN 
            inventorySizes s ON i.id = s.productId;
    `;
    try {
        const results = await database.query(query);
        // Transform the results into the desired format
        const inventory = results[0].reduce((acc, row) => {
            // Check if the product already exists in the accumulator
            const existingProduct = acc.find(item => item.id === row.id);
            
            if (existingProduct) {
                // If the product exists, add the size to the sizes array
                existingProduct.sizes.push({
                    size: row.size,
                    quantity: row.quantity
                });
            } else {
                // If the product doesn't exist, create a new entry
                acc.push({
                    id: row.id,
                    name: row.name,
                    price: row.price,
                    description: row.description,
                    image: row.image,
                    sizes: [{
                        size: row.size,
                        quantity: row.quantity
                    }]
                });
            }
            return acc;
        }, []);
        
        return inventory;
    } catch (err) {
        return {error: err.message};    
    } finally {
        database.release();
    }
}

const getItemsById = async (id) => {
    const database = await connectionPool.getConnection();
    const query = `
        SELECT 
            i.id, 
            i.productName, 
            i.price, 
            i.description, 
            i.image,
            s.size,
            s.quantity
        FROM 
            inventory i
        LEFT JOIN 
            inventorySizes s ON i.id = s.productId
        WHERE i.id = ?;
    `;
    try {
        const results = await database.query(query, [id]);
         // Transform the results into the desired format
         const item = results[0].reduce((acc, row) => {
            if (!acc) {
                // If this is the first row, create a new item object
                return {
                    id: row.id,
                    productName: row.productName,
                    price: row.price,
                    description: row.description,
                    image: row.image,
                    sizes: []
                };
            }
            // Add the size to the sizes array
            acc.sizes.push({
                size: row.size,
                quantity: row.quantity
            });
            return acc;
        }, null);
        
        return item || { error: 'Item not found' }; // Return the item or an error if not found
    } catch (err) {
        return {error: err.message};
    } finally {
        database.release();
    }
}

const getItemsByProductName = async (productName) => {
    const database = await connectionPool.getConnection();
    const query = `
        SELECT 
            i.id, 
            i.productName, 
            i.price, 
            i.description, 
            i.image,
            s.size,
            s.quantity
        FROM 
            inventory i
        LEFT JOIN 
            inventorySizes s ON i.id = s.productId
        WHERE productName = ?;
    `;
    try {
        const results = await database.query(query, [productName]);
         // Transform the results into the desired format
         const item = results[0].reduce((acc, row) => {
            if (!acc) {
                // If this is the first row, create a new item object
                return {
                    id: row.id,
                    name: row.productName,
                    price: row.price,
                    description: row.description,
                    image: row.image,
                    sizes: []
                };
            }
            // Add the size to the sizes array
            acc.sizes.push({
                size: row.size,
                quantity: row.quantity
            });
            return acc;
        }, null);
        
        return item || { error: 'Item not found' }; // Return the item or an error if not found
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

const updateItemSizeQuantity = async (id, size, quantity) => {
    const database = await connectionPool.getConnection();

    if (!id || !size || quantity === undefined || quantity === null) {
        return { error: "Missing or invalid id, size, or quantity" };
    }

    const query = `UPDATE inventorySizes SET quantity = ? WHERE productId = ? AND size = ?`;
    try {
        await database.query(query, [quantity, id, size]);

        if (result.affectedRows === 0) {
            return { error: "Item not found or no changes made" };
        }

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

module.exports = { createItems, getInventory, getItemsById, getItemsByProductName, updateItem, updateItemSizeQuantity, deleteItem };
