const OneService = require("../vong1/OneService");
const FourService = require("../vong4/FourService");
const Socket4 = async (io, socket) => {
  socket.on("listUser4", async (msg) => {
    const listUser = await OneService.getListUser();
    io.emit("listUserServer4", listUser);
  });

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

  socket.on("startTime4", async (msg) => {
    io.emit("startTimeServer4", msg);
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

  socket.on("optionQuestion4", async (msg) => {
    io.emit("optionQuestionServer4", msg);
  });

  socket.on("finishTurn4", async (msg) => {
    io.emit("finishTurnServer4", msg);
  });

  socket.on("startTurn4", async (msg) => {
    io.emit("startTurnServer4", msg);
  });

  socket.on("correctFinish4", async (msg) => {
    io.emit("correctFinisherver4", msg);
  });

  socket.on("wrongFinish4", async (msg) => {
    io.emit("wrongFinishServer4", msg);
  });
  socket.on("pressRung4", async (msg) => {
    io.emit("pressRungServer4", msg);
  });
};

module.exports = {
  Socket4,
};
