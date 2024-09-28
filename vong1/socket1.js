const OneService = require("./OneService");
const UserService = require("../user/UserService");
const Socket1 = async (io, socket) => {
  socket.on("listUser", async (msg) => {
    const listUser = await UserService.getListUser();
    io.emit("listUserServer", listUser);
  });

  socket.on("listUserAndScore", async (msg) => {
    const listUser = await OneService.getListUser();
    io.emit("listUserAndScoreServer", listUser);
    console.log(listUser);
  });

  socket.on("finishTurnUser", async (msg) => {
    const listUser = await OneService.getListUser();
    io.emit("finishTurnUserServer", listUser);
  });

  socket.on("quesGame1", async (msg) => {
    const question = await OneService.getQuestionByIdAndNo(
      msg.idUser,
      msg.noQues
    );
    io.emit("quesGame1Server", question[0]);
  });

  socket.on("getAllQuestionGroup1", async () => {
    const question = await OneService.getAllQuestionGroup();
    io.emit("getAllQuestionGroupServer1", question);
  });

  socket.on("createAllQuestionGroup1", async (msg) => {
    const res = await OneService.createQuestionGroup(msg);
    console.log(res);
    const question = await OneService.getAllQuestionGroup();
    io.emit("getAllQuestionGroupServer1", question);
  });

  socket.on("updateAllQuestionGroup1", async (msg) => {
    const res = await OneService.updateQuestionGroup(msg);
    console.log(res);
    const question = await OneService.getAllQuestionGroup();
    io.emit("getAllQuestionGroupServer1", question);
  });

  socket.on("deleteQuestionGroup1", async (msg) => {
    const res = await OneService.deleteQuestionGroup(msg);
    console.log(res);
    const question = await OneService.getAllQuestionGroup();
    io.emit("getAllQuestionGroupServer1", question);
  });

  socket.on("quesGroup1", async (noQues) => {
    const question = await OneService.getQuestionGroupByNo(noQues);
    io.emit("questionGroupServer", question[0]);
  });

  socket.on("updateScore", async (msg) => {
    const listUserScore = await OneService.updateScoreGame(
      msg.score,
      msg.idUser
    );
    const listUser = await OneService.getListUser();
    io.emit("listUserAndScoreServer", listUser);
  });

  socket.on("startControl", async (msg) => {
    io.emit("startTimeServer", "start");
  });

  socket.on("pressRung1", async (msg) => {
    io.emit("pressRung1Server", msg);
  });

  socket.on("nextGroup1", async (msg) => {
    io.emit("nextGroupServer1", msg);
    io.emit("nextGameFromSever", "/vong-group/1/user");
  });

  socket.on("next2", async (msg) => {
    io.emit("nextServer2", msg);
    io.emit("nextGameFromSever", "/vong/2/user");
  });

  socket.on("getAllQuestion", async (msg) => {
    const listQuestion = await OneService.getAllQuestionAndUser();
    io.emit("getAllQuestionServer1", listQuestion);
  });

  socket.on("createQuestion1", async (data) => {
    const res = await OneService.createQuestion(data);
    const listQuestion = await OneService.getAllQuestionAndUser();
    io.emit("getAllQuestionServer1", listQuestion);
  });

  socket.on("updateQuestion1", async (data) => {
    const res = await OneService.updateQuestion(data);
    const listQuestion = await OneService.getAllQuestionAndUser();
    io.emit("getAllQuestionServer1", listQuestion);
  });

  socket.on("deleteQuestion1", async (data) => {
    const res = await OneService.deleteQuestion(data);
    console.log(res);
    const listQuestion = await OneService.getAllQuestionAndUser();
    io.emit("getAllQuestionServer1", listQuestion);
  });

  socket.on("startTurnControl", async (data) => {
    io.emit("startTurnlServer1", data);
  });

  socket.on("preMainTimeControl", async (data) => {
    io.emit("preMainTimeControlServer1", data);
  });

  socket.on("correctAnswerControl1", async (data) => {
    io.emit("correctAnswerServer1", data);
  });

  socket.on("wrongAnswerControl1", async (data) => {
    io.emit("wrongAnswerServer1", data);
  });

  socket.on("finishTurnrControl1", async (data) => {
    io.emit("finishTurnrServer1", data);
    console.log("Finish");
  });
};

module.exports = {
  Socket1,
};
