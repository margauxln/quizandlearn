const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
// const router = express.Router();

const app = express();

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//BodyParser
app.use(express.urlencoded({ extended: false }));

const port = 5000;
app.listen(port, () =>
  console.log(`Server started on port: http://localhost:${port}`)
);

/*
//Routes
app.use('/',require('./routes/index'));
*/
