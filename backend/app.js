const express = require('express');
const mongoose = require('mongoose');
const config = require("config");
const userRoutes = require('./routes/users');

const app = express();
//connection bdd avec mongoose
const db = config.get("mongoURI");

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/auth', userRoutes);

module.exports = app;