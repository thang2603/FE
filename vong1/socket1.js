const OneService = require("./OneService");

const Socket1 = async (io, socket) => {
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
  socket.on("quesGroup1", async (noQues) => {
    const question = await OneService.getQuestionGroupByNo(noQues);
    console.log(question);
    io.emit("quesGame1Server", question[0]);
  });

  socket.on("updateScore", async (msg) => {
    console.log("list : " + msg.score);
    console.log("list : " + msg.idUser);
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
};

module.exports = {
  Socket1,
};
