require('dotenv').config();
const express = require('express');
const cors = require('cors');

// create main app
const app = express();

// set up Port
const PORT = process.env.PORT || 5000;

// configure front end url
const MONGO_URI = process.env.MONGO_URI;

cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

app.use(express.json());

// db connection

const mongoose = require('mongoose');
mongoose
    .connect(MONGO_URI)
    .then(()=>console.log('mongodb connection established'))
    .catch(err=>console.log(err));

    app.use((err, req, res, next) => {
      console.log(err.stack);
      res.status(500).json({
        success : false,
        message : 'Something broke!'
      });
    });


    // listen to a port
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
