const OneService = require("./OneService");

const Socket1 = async (io, socket) => {
  socket.on("listUser", async (msg) => {
    const listUser = await OneService.getListUser();
    io.emit("listUserServer", listUser);
  });

  socket.on("quesGame1", async (msg) => {
    const question = await OneService.getQuestionByIdAndNo(
      msg.idUser,
      msg.noQues
    );

    io.emit("quesGame1Server", question[0]);
  });

  socket.on("quesGroup1", async (noQues) => {
    const question = await OneService.getQuestionGroupByNo(noQues);
    io.emit("quesGame1Server", question[0]);
  });

  socket.on("updateScore", async (msg) => {
    const listUserScore = await OneService.updateScoreGame(
      msg.score,
      msg.idUser
    );
    const listUser = await OneService.getListUser();
    io.emit("listUserServer", listUser);
  });

  socket.on("startControl", async (msg) => {
    io.emit("startTimeServer", "start");
  });

  socket.on("pressRung1", async (msg) => {
    io.emit("pressRung1Server", msg);
  });

  socket.on("nextGroup1", async (msg) => {
    io.emit("nextGroupServer1", msg);
  });

  socket.on("next2", async (msg) => {
    io.emit("nextServer2", msg);
  });

  socket.on("getAllQuestion", async (msg) => {
    const listQuestion = await OneService.getAllQuestionAndUser();
    console.log(listQuestion);
    io.emit("getAllQuestionServer1", listQuestion);
  });

  socket.on("createQuestion1", async (data) => {
    const res = await OneService.createQuestion(data);
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
};

module.exports = {
  Socket1,
};
