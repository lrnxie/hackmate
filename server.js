const express = require("express");
const env = require("dotenv").config({ path: "./config/config.env" });
const connectDB = require("./config/db");

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
