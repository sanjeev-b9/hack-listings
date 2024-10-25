const express = require("express");
const listings = require("./data/listings");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const allowedOrigins = [
    'http://localhost:3000',
    'https://hack-listings-client.vercel.app/'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Allow if origin is in the list
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust "*" to a specific domain if necessary
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/listings", (req, res) => {
    res.json(listings);
});

app.get("/api/listings/:id", (req, res) => {
    const listing = listings.find(n => n.id == req.params.id);
    res.send(listing);
});


const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on PORT ${PORT}`)); 