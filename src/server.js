"use strict";

const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const validator = require("./middleware/validator");
const logger = require("./middleware/logger");
// -----

app.get("/", (req, res) => {
  res.status(200).send("Welcome to express home! 🏡 ");
});

app.use(express.static("./public"));

app.get("/person", validator, (req, res) => {
  const { name } = req.query;
  res.status(200).json({ name: name });
});

// -----

app.use("*", notFoundHandler);
app.use(errorHandler);
app.use(logger);

function start() {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}

module.exports = {
  app,
  start,
};
