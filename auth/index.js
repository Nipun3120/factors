require("dotenv").config();
require("./database/database.config").connect();
const express = require("express");
const http = require("http");
const cors = require("cors");

// port
const port = process.env.PORT || 4000;

// creating server
const app = express();
const server = http.createServer(app);


// middlewares
const users = require("./api/users");
app.use(express.json({ type: "application/json" }));

// cors
app.use(cors({ origin: "*" }));

// routes
app.use("/users", users);

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
