require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./db/conn");
const loginRoute = require("./routes/login");

const port = process.env.PORT || 5000;

// Configure CORS for specific origins
const allowedOrigins = ['https://mern-omega-livid.vercel.app/', 'http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'], // Add other allowed methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Add required headers
    credentials: true,
    preflightContinue: true, // Enable handling preflight requests
};

// Connect to the MongoDB using the connection function
connectToMongo()
    .then((db) => {
        console.log("Connected to MongoDB");

        // Use the database object (db) in your routes or wherever needed
        app.use("/login", loginRoute(db));

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
