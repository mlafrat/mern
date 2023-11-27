const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

const handler = (req, res) => {
    const d = new Date();
    res.end(d.toString());
};

app.use('/login', allowCors(handler)); // Applying the allowCors middleware to the /login route

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
