const OneService = require("../vong1/OneService");
const FourService = require("../vong4/FourService");
const Socket4 = async (io, socket) => {
  socket.on("listUser4", async (msg) => {
    const listUser = await OneService.getListUser();
    io.emit("listUserServer4", listUser);
  });
  // socket.on("addUserGame5", async (msg) => {
  //   const listUser = await use
  //   io.emit("addUserGameServer5", listUser);
  // });

  socket.on("questionUser4", async (msg) => {
    const listQuestion = await FourService.getListQuestionByIdUser(msg);
    io.emit("questionUserServer4", listQuestion);
  });

  socket.on("sendQuestion4", async (msg) => {
    io.emit("sendQuestionServer4", msg);
  });

  socket.on("start", async (msg) => {
    io.emit("startServer4", msg);
  });

  socket.on("cancelStart", async (msg) => {
    io.emit("cancelStartServer4", msg);
  });

  socket.on("updateScore4", async (msg) => {
    for (let i = 0; i < msg.length; i++) {
      const res1 = await OneService.updateScoreGame(
        msg[i].score + msg[i].updateScore,
        msg[i].id
      );
    }
    const listUser = await OneService.getListUser();
    io.emit("listUserServer4", listUser);
  });

  socket.on("getAllQuestion4", async (msg) => {
    const listQuestion = await FourService.getListQuestion();
    io.emit("getAllQuestionServer4", listQuestion);
  });

  socket.on("createQuestion4", async (msg) => {
    const res = await FourService.createQuestion(msg);
    const listQuestion = await FourService.getListQuestion();
    io.emit("getAllQuestionServer4", listQuestion);
  });

  socket.on("updateQuestion4", async (msg) => {
    const res = await FourService.updateQuestion(msg);
    const listQuestion = await FourService.getListQuestion();
    io.emit("getAllQuestionServer4", listQuestion);
  });

  socket.on("deleteQuestion4", async (msg) => {
    const res = await FourService.deleteQuestion(msg);
    const listQuestion = await FourService.getListQuestion();
    io.emit("getAllQuestionServer4", listQuestion);
  });
};

module.exports = {
  Socket4,
};
