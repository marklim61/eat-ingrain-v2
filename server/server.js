require("dotenv").config();

const express = require("express");
const initializeDatabase = require('./database/initialize');
const { Client } = require("square");
const bodyParser = require("body-parser");
const cors = require("cors");
const {swaggerDocs} = require('./swagger/swaggerDocs');
const { order, getOrders, getNewOrders, getOrdersInTransit, getOrdersDelivered, getOrdersByPhoneNumber, removeOrderById, removeOrderByPhoneNumber } = require("./service/orders");
const { createEvent, getEvents, getPastEvents, getUpcomingEvents, updateEvent, deleteEvent } = require("./service/events");
const { createItems, getInventory, getItemsById, getItemsByProductName, updateItem, updateItemSizeQuantity, deleteItem } = require("./service/inventory");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors({ origin: process.env.CLIENT_URL })); // Allow requests from this origin (5173)


// --------------------Get endpoints----------------------------------------
/**
 * @openapi
 * /get-orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Returns an array of orders
 *       500:
 *         description: Internal server error
 */
app.get("/get-orders", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders", details: err.message });
  }
});

/**
 * @openapi
 * /get-new-orders:
 *   get:
 *     summary: Get all new orders
 *     responses:
 *       200:
 *         description: Returns an array of orders
 *       500:
 *         description: Internal server error
 */
app.get("/get-new-orders", async (req, res) => {
  try {
    const orders = await getNewOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders", details: err.message });
  }
})

/**
 * @openapi
 * /get-orders-in-transit:
 *   get:
 *     summary: Get all orders in transit
 *     responses:
 *       200:
 *         description: Returns an array of orders
 *       500:
 *         description: Internal server error
 */
app.get("/get-orders-in-transit", async (req, res) => {
  try {
    const orders = await getOrdersInTransit();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders", details: err.message });
  }
})

/**
 * @openapi
 * /get-orders-delivered:
 *   get:
 *     summary: Get all orders delivered
 *     responses:
 *       200:
 *         description: Returns an array of orders
 *       500:
 *         description: Internal server error
 */
app.get("/get-orders-delivered", async (req, res) => {
  try {
    const orders = await getOrdersDelivered();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders", details: err.message });
  }
})

/**
 * @openapi
 * /get-orders/{phoneNumber}:
 *   get:
 *     summary: Get orders by phone number
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The phone number of the customer
 *     responses:
 *       200:
 *         description: Returns an array of orders
 *       500:
 *         description: Internal server error
 */
app.get("/get-orders/:phoneNumber", async (req, res) => {
  try {
    const orders = await getOrdersByPhoneNumber(req.params.phoneNumber);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders", details: err.message });
  }
})

/**
 * @openapi
 * /get-events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: Returns an array of events
 *       500:
 *         description: Internal server error
 */
app.get("/get-events", async (req, res) => {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to get events", details: err.message });
  }
})

/**
 * @openapi
 * /get-past-events:
 *   get:
 *     summary: Get all past events
 *     responses:
 *       200:
 *         description: Returns an array of events
 *       500:
 *         description: Internal server error
 */
app.get("/get-past-events", async (req, res) => {
  try {
    const events = await getPastEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to get events", details: err.message });
  }
})

/**
 * @openapi
 * /get-upcoming-events:
 *   get:
 *     summary: Get all upcoming events
 *     responses:
 *       200:
 *         description: Returns an array of events
 *       500:
 *         description: Internal server error
 */
app.get("/get-upcoming-events", async (req, res) => {
  try {
    const events = await getUpcomingEvents(); 
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to get events", details: err.message });
  }
})

/**
 * @openapi
 * /get-inventory:
 *   get:
 *     summary: Get all items in the inventory
 *     responses:
 *       200:
 *         description: Returns an array of inventory
 *       500:
 *         description: Internal server error
 */
app.get("/get-inventory", async (req, res) => {
  try {
    const inventory = await getInventory();
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ error: "Failed to get inventory", details: err.message });
  }
})

/**
 * @openapi
 * /get-inventory/id/{id}:
 *   get:
 *     summary: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item
 *     responses:
 *       200:
 *         description: Returns the item
 *       500:
 *         description: Internal server error
 */
app.get("/get-inventory/id/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const inventory = await getItemsById(req.params.id);
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ error: "Failed to get inventory", details: err.message });
  }
})

/**
 * @openapi
 * /get-inventory/item/{productName}:
 *   get:
 *     summary: Get an item by product name
 *     parameters:
 *       - in: path
 *         name: productName
 *         required: true
 *         schema:
 *           type: string
 *         description: The product name of the item
 *     responses:
 *       200:
 *         description: Returns the item
 *       500:
 *         description: Internal server error
 */
app.get("/get-inventory/item/:productName", async (req, res) => {
  try {
    const inventory = await getItemsByProductName(req.params.productName);
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ error: "Failed to get inventory", details: err.message });
  }
})
// --------------------end of get endpoints----------------------------------------

// --------------------Post endpoints----------------------------------------
/**
 * @openapi
 * /create-order:
 *   post:
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               appartmentNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order created successfully
 *       500:
 *         description: Failed to create order
 */
app.post('/create-order', async (req, res) => {
  const { firstName, lastName, email, address, appartmentNumber, city, country, state, zipCode, phoneNumber } = req.body;

  try {
      const result = await order(firstName, lastName, email, address, appartmentNumber, city, country, state, zipCode, phoneNumber);
      if (result.error) {
          res.status(500).json(result);
      } else {
          res.status(200).json(result);
      }
  } catch (err) {
      res.status(500).json({ error: "Failed to create order", details: err.message });
  }
});

/**
 * @openapi
 * /remove-order:
 *   post:
 *     summary: Remove an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order removed successfully
 *       500:
 *         description: Failed to remove order
 */
app.post('/remove-order', async (req, res) => {
  const { id } = req.body;
  try {
      const result = await removeOrderById(id);
      if (result.error) {
          res.status(500).json(result);
      } else {
          res.status(200).json(result);
      }
  } catch (err) {
      res.status(500).json({ error: "Failed to remove order", details: err.message });
  }
});

/**
 * @openapi
 * /remove-order-by-phone-number:
 *   post:
 *     summary: Remove an order by phone number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order removed successfully
 *       500:
 *         description: Failed to remove order
 */
app.post('/remove-order-by-phone-number', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
      const result = await removeOrderByPhoneNumber(phoneNumber);
      if (result.error) {
          res.status(500).json(result);
      } else {
          res.status(200).json(result);
      }
  } catch (err) {
      res.status(500).json({ error: "Failed to remove order", details: err.message });
  }
});

/**
 * @openapi
 * /create-event:
 *   post:
 *     summary: Create an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               nameOfPlace:
 *                 type: string
 *               address:
 *                 type: string
 *               date:
 *                 type: string 
 *                 format: date
 *               time:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: blob
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event created successfully
 *       500:
 *         description: Failed to create event
 */
app.post('/create-event', async (req, res) => {
  const { title, nameOfPlace, address, date, time, image, description } = req.body;
  try {
    const result = await createEvent(title, nameOfPlace, address, date, time, image, description);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create event", details: err.message });
  }
})

/**
 * @openapi
 * /delete-event:
 *   post:
 *     summary: Delete an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       500:
 *         description: Failed to delete event
 */
app.post('/delete-event', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await deleteEvent(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event", details: err.message });
  }
})

/**
 * @openapi
 * /create-items:
 *   post:
 *     summary: Create an item/s in the inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item created successfully
 *       500:
 *         description: Failed to create item
 */
app.post('/create-items', async (req, res) => {
  console.log(req.body);
  const { productName, description, price, sizes, image } = req.body;

  if (!productName || !description || price == null || price == undefined || !sizes) {
    return res.status(400).json({ error: "Missing required fields or invalid sizes format" });
  }

  try {
    const result = await createItems(productName, description, price, sizes, image);
    console.log(1)
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create item", details: err.message });
  }
})

/**
 * @openapi
 * /delete-item:
 *   post:
 *     summary: Delete an item from the inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       500:
 *         description: Failed to delete item
 */
app.post('/delete-item', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await deleteItem(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item", details: err.message });
  }
})
//--------------------end of post endpoints----------------------------------------

//--------------------update endpoints----------------------------------------
/**
 * @openapi
 * /update-event:
 *   patch:
 *     summary: Update an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *               nameOfPlace:
 *                 type: string
 *               address:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: blob
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       500:
 *         description: Failed to update event
 */
app.patch('/update-event', async (req, res) => {
  const { id, ...updateFields } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  try {
    const result = await updateEvent(id, updateFields);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to update event", details: err.message });
  }
});

/**
 * @openapi
 * /update-item:
 *   patch:
 *     summary: Update an item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       500:
 *         description: Failed to update item
 */ 
app.patch('/update-item', async (req, res) => {
  const { id, ...updateFields } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  try {
    const result = await updateItem(id, updateFields);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to update Item", details: err.message });
  }
});

/**
 * @openapi
 * /update-item-size-quantity:
 *   patch:
 *     summary: Update an item size
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               size:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item size updated successfully
 *       500:
 */
app.patch('/update-item-size-quantity', async (req, res) => {
  const { id, size, quantity } = req.body;

  if (!id || !size || quantity === undefined || quantity === null) {
    return res.status(400).json({ error: "Item ID, size, and quantity is required" });
  }

  if (quantity < 0) {
    return res.status(400).json({ error: "Quantity cannot be negative" });
  }

  try {
    const result = await updateItemSizeQuantity(id, size, quantity);
    res.status(200).json(result);
  } catch (err) { 
    res.status(500).json({ error: "Failed to update item size", details: err.message });
  }
});
//--------------------end of update endpoints----------------------------------------

// Add this line to handle BigInt serialization
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Import the storeItems from the JSON file (fake database for now)
const storeItems = require("./storeItems.json");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox", // Change to 'production' for live environment
});

// Endpoint to serve product data
app.get("/store-items", async (req, res) => {
  res.json(storeItems);
  // try {
  //   const res = await getInventory();
  //   // const products = res.map((item) => ({
  //   //   id: item.id,
  //   //   productName: item.productName,
  //   //   description: item.description,
  //   //   price: item.price,
  //   //   size: item.size,
  //   //   quantity: item.quantity
  //   // }))
  //   res.status(200).json();
  // } catch (err) {
  //   res.status(500).json({ error: "Failed to get orders", details: err.message });
  // }
});

app.get("/store-items/:id", (req, res) => {
  const product = storeItems.find(
    (item) => item.id === parseInt(req.params.id)
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/api/submitPayment", async (req, res) => {
  const {
    sourceId,
    cardholderName,
    billingAddress,
    billingCity,
    billingState,
    billingCountry,
    billingPostalCode,
    emailAddress,
    shippingAddress,
    amount,
  } = req.body;

  // Log the some datas
  console.log("Source ID:", sourceId); 
  console.log("Amount (in dollars):", amount);

  const idempotencyKey = require("crypto").randomUUID();

  try {
    const amountInCents = BigInt(Math.round(parseFloat(amount) * 100));
    
    console.log("Amount (in cents):", amountInCents); // 'n': Indicates it's a BigInt.

    const { result } = await client.paymentsApi.createPayment({
      idempotencyKey,
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: amountInCents, // Change to the actual amount you want to charge
      },
      billingAddress: {
        addressLine1: billingAddress,
        locality: billingCity,
        administrativeDistrictLevel1: billingState,
        country: billingCountry,
        postalCode: billingPostalCode,
      },
      buyerEmailAddress: emailAddress,
      shippingAddress: {
        addressLine1: shippingAddress,
        // Add other shipping address fields if needed
      },
      note: `Payment from ${cardholderName}`,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
//   swaggerDocs(app);
// });

initializeDatabase()
.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    swaggerDocs(app);
  });
}).catch(err => {
  console.error("Error during server startup:", err.message);
  process.exit(1); // Exit the process with an error code if initialization fails
});
