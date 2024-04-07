const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `${process.env.MONGODB_URL}`
  )
  .then(() => console.log("Connected to MongoDB"));

app.use("/api", routes);

app.listen(5000, () => console.log("Server started on port 5000"));
