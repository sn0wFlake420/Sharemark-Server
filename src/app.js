const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.send("WOrking");
});

io.on("connection", (socket) => {
  console.log("User connected");
});

app.listen(8000, () => {
  console.log("Working");
});
