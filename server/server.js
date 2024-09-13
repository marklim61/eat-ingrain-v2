require("dotenv").config();

const express = require("express");
const { Client } = require("square");
const bodyParser = require("body-parser");
const cors = require("cors");
const {swaggerDocs} = require('./swagger/swaggerDocs');
const { order, getOrders, getOrdersByPhoneNumber, removeOrderById, removeOrderByPhoneNumber } = require("./service/orders");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("./service/events");

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

app.post('/delete-event', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await deleteEvent(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event", details: err.message });
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
app.get("/store-items", (req, res) => {
  res.json(storeItems);
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  swaggerDocs(app);
});
