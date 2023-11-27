const express = require("express");
const app = express();
cors = require("cors");
const port = process.env.PORT || 5000;

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

app.options('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
    console.log('Preflight request for /login received');
});

app.post('/login', (req, res) => {
    res.sendStatus(200);
    console.log('POST request to /login received');
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
