const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51KOOUvSDjYDA7PyPctxT1Yw6vYf8dAEfEBhacwkveUe4DeDhW57dJH40lOZfgQs2lQ7XUj4Kgl4hd51dxn1l5xx400elOQV1Ex");

// Express provides plugins, template code, middleware packages, and routing functionality for faster and efficient web development

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin : true}));
app.use(express.json()); // allows to send and pass data in json format

// API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log('Payment request received!!! for this amount :', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,   // subunits of currency
        currency : "inr",
    });

    // OK - Created
    response.status(201).send ({
        clientSecret : paymentIntent.client_secret,
    });
});

// Listen command
exports.api = functions.https.onRequest(app);

//Example end point
// http://localhost:5001/clone-9cf65/us-central1/api