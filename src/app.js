const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const visitorsRouter = require("./routes/visitors");
const booksRouter = require("./routes/books");

const loggerRequestUrl = require("./middlewares/loggerRequestUrl");
const cors = require("./middlewares/cors");

dotenv.config();

const {
  PORT = 3005,
  API_URL = "http://127.0.0.1",
  MONGODB_URL = "mongodb://localhost:27017/skypro-node-js",
} = process.env;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => {
    throw error;
  });

const app = express();

app.use(cors);
app.use(loggerRequestUrl);
app.use(bodyparser.json());

app.use(visitorsRouter);
app.use(booksRouter);

app.use((request, response) => {
  response.status(404).send("Страница не найдена");
});

app.use((error, request, response) => {
  console.error(error.message);
  response.status(500).send("Что-то сломалось!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен, url: ${API_URL}:${PORT}/`);
});
