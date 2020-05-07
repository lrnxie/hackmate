const express = require("express");
const env = require("dotenv").config({ path: "./config/config.env" });
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json());

const usersRoute = require("./routes/users.route");

app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
