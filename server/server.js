require("dotenv").config();

const express = require("express");
const { Client } = require("square");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors({ origin: process.env.CLIENT_URL })); // Allow requests from this origin (5173)

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
});
