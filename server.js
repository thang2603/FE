const express = require("express");
const app = express();
const OneService = require("./vong1/OneService");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
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

  socket.on("listUser", async (msg) => {
    console.log("list : " + msg);
    const listUser = await OneService.getListUser();
    io.emit("listUserServer", listUser);
  });

  socket.on("quesGame1", async (msg) => {
    console.log("ques : " + msg.idUser);
    const question = await OneService.getQuestionByIdAndNo(
      msg.idUser,
      msg.noQues
    );
    console.log(question);
    io.emit("quesGame1Server", question[0]);
  });

  socket.on("updateScore", async (msg) => {
    console.log("list : " + msg);
    const listUser = await OneService.updateScoreGame(msg.score, msg.idUser);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listing in : ${PORT}`);
});
