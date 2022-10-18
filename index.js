const express = require("express");
const app = express();
const path = require("path");
const Socket = require("socket.io");
const cors = require("cors");

let count = 0;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(8000);
const io = Socket(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
  count++;
  console.log(`Number of users: ${count}`);

  socket.broadcast.emit("broadcast", `User ${socket.id} connected`);

  socket.on("message", (data) => {
    socket.broadcast.emit("new-data", data);
  });

  socket.on("disconnect", () => {
    count--;
    console.log(`User id ${socket.id} disconnected`);
    console.log(`No. of users: ${count}`);
    socket.broadcast.emit("broadcast", `User ${socket.id} disconnected`);
  });
});
