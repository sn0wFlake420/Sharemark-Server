console.log("Script working");

const socket = io();
socket.on("connect", function (data) {
  socket.emit("join", "Hello World from client");
});
