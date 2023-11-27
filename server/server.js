require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./db/conn");
const loginRoute = require("./routes/login");

const port = process.env.PORT || 5000;

// Configure CORS for specific origins
const allowedOrigins = ['https://mern-omega-livid.vercel.app', 'http://localhost:3000'];

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

// Apply CORS middleware globally for all routes
app.use(cors(corsOptions));

// Define a specific OPTIONS route for '/login'
app.options('/login', cors(corsOptions), (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://mern-omega-livid.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// Connect to the MongoDB using the connection function
connectToMongo()
    .then((db) => {
        console.log("Connected to MongoDB");

        // Use the database object (db) in your routes or wherever needed
        app.use('/login', loginRoute(db));

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
