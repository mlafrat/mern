require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./db/conn");
const loginRoute = require("./routes/login");

const port = process.env.PORT || 5000;

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
