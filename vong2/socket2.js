const OneService = require("../vong1/OneService");
const TwoService = require("../vong2/TwoService");
const Socket2 = async (io, socket) => {
  socket.on("listUser2", async (msg) => {
    const listUser = await OneService.getListUser();
    io.emit("listUserServer2", listUser);
    for (let i = 0; i < listUser?.length; i++) {
      const res = await TwoService.updateAnswer("", listUser[i].id);
    }
  });

  socket.on("listQuestion2", async (msg) => {
    const listQuestion = await TwoService.getListQuestion();
    io.emit("listQuestionServer2", listQuestion);
  });

  socket.on("question2", async (msg) => {
    const question = await TwoService.getQuestion(msg);
    io.emit("questionServer2", question[0]);
  });

  socket.on("startControl2", async (msg) => {
    io.emit("startTimeServer2", "start");
  });

  socket.on("answer2", async (msg) => {
    const res = await TwoService.updateAnswer(msg.ans, msg.idUser);
  });

  socket.on("updateScore2", async (msg) => {
    for (let i = 0; i < msg.length; i++) {
      let score = msg[i].score + msg[i].updateScore;
      const res1 = await OneService.updateScoreGame(score, msg[i].id);
    }
    const listUser = await OneService.getListUser();
    io.emit("listUserServer2", listUser);
  });

  socket.on("showResult2", async (msg) => {
    const res = await TwoService.getAnswer();
    io.emit("showResultServer2", res);
  });

  socket.on("showImage2", async (msg) => {
    const res = await TwoService.updateStatusQuestion(msg);
    const listQuestion = await TwoService.getListQuestion();
    io.emit("listQuestionServer2", listQuestion);
  });

  socket.on("getAllQuestion2", async (msg) => {
    const listQuestion = await TwoService.getListQuestion();
    io.emit("getAllQuestionServer2", listQuestion);
  });

  socket.on("createQuestion2", async (msg) => {
    const res = await TwoService.createQuestion(msg);
    const listQuestion = await TwoService.getListQuestion();
    io.emit("getAllQuestionServer2", listQuestion);
  });

  socket.on("updateQuestion2", async (msg) => {
    const res = await TwoService.updateQuestion(msg);
    const listQuestion = await TwoService.getListQuestion();
    io.emit("getAllQuestionServer2", listQuestion);
  });

  socket.on("deleteQuestion2", async (data) => {
    const res = await TwoService.deleteQuestion(data);
    const listQuestion = await TwoService.getListQuestion();
    io.emit("getAllQuestionServer2", listQuestion);
  });

  socket.on("next3", async (msg) => {
    io.emit("nextServer3", "next3");
    io.emit("nextGameFromSever", "/vong/3/user");
  });

  socket.on("choseRowControl", async (msg) => {
    io.emit("choseRowServer", "next3");
  });

  socket.on("allWrongControl", async (msg) => {
    io.emit("allWrongServer", "next3");
  });
};

module.exports = {
  Socket2,
};
