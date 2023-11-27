const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

const allowedOrigins = ['https://mern-omega-livid.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: true,
};

app.options('/login', cors(corsOptions), (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://mern-omega-livid.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

app.post('/login', cors(corsOptions), (req, res) => {
    res.sendStatus(200);
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
