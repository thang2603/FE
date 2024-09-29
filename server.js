const express = require("express");

const app = express();
const OneService = require("./vong1/OneService");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const SocketUser = require("./user/SocketUser");
const SocketV4 = require("./vong4/socket4");
const SocketV3 = require("./vong3/socket3");
const SocketV2 = require("./vong2/socket2");
const SocketV1 = require("./vong1/socket1");

const SocketV5 = require("./vong5/socket5");
const PORT = 4000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e6, // Điều chỉnh giới hạn buffer
  pingInterval: 10000, // Điều chỉnh ping interval
  pingTimeout: 5000, // Điều chỉnh ping timeout
  maxConnectionAttempts: 100, // Tăng giới hạn kết nối
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

  // vong 4
  SocketV4.Socket4(io, socket);

  //vong 5
  SocketV5.Socket5(io, socket);

  SocketUser.SocketUser(io, socket);
  // disconect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listing in : ${PORT}`);
});
