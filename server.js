const express = require("express");

const app = express();
const OneService = require("./vong1/OneService");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const SocketV3 = require("./vong3/socket3");
const SocketV2 = require("./vong2/socket2");
const SocketV1 = require("./vong1/socket1");
const PORT = 4000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user connnect : ${socket.id}`);

  socket.on(`login`, async (msg) => {
    console.log(msg);
    // const user = await OneService.createUser(msg);
    const userId = await OneService.getUserByName(msg.fullName);
    socket.emit("userInfor", userId);
    console.log(userId);
  });
  // vong 1
  SocketV1.Socket1(io, socket);

  // vong 2
  SocketV2.Socket2(io, socket);

  //vong 3

  SocketV3.Socket3(io, socket);

  // disconect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listing in : ${PORT}`);
});
