const OneService = require("../vong1/OneService");
const ThreeService = require("../vong3/ThreeService");
const Socket3 = async (io, socket) => {
  socket.on("listUser3", async (msg) => {
    console.log("list : " + msg);
    const listUser = await OneService.getListUser();
    io.emit("listUserServer3", listUser);
    console.log(listUser);
  });

  socket.on("listQuestion3", async (msg) => {
    console.log("list : " + msg);
    const listQuestion = await ThreeService.getListQuestion();
    console.log(listQuestion);
    io.emit("listQuestionServer3", listQuestion);
  });

  socket.on("question3", async (msg) => {
    console.log(msg);
    const question = await ThreeService.getQuestion(msg);
    console.log(question);
    io.emit("questionServer3", question[0]);
  });

  socket.on("startControl3", async (msg) => {
    io.emit("startTimeServer3", "start");
  });

  socket.on("answer3", async (msg) => {
    console.log(msg);
    const res = await ThreeService.updateAnswer(
      msg.ans,
      msg.idUser,
      msg?.updateAt
    );
  });

  socket.on("updateScore3", async (msg) => {
    io.emit("correct3", msg);
    for (let i = 0; i < msg.length; i++) {
      const res1 = await OneService.updateScoreGame(
        msg[i].score + msg[i].updateScore,
        msg[i].id
      );
    }
  });

  socket.on("showResult3", async (msg) => {
    console.log(msg);
    const res = await ThreeService.getAnswer();
    console.log(res);
    io.emit("showResultServer3", res);
  });

  //   socket.on("showImage2", async (msg) => {
  //     console.log(msg);
  //     const res = await TwoService.updateStatusQuestion(msg);
  //     const listQuestion = await TwoService.getListQuestion();
  //     io.emit("listQuestionServer2", listQuestion);
  //   });
};

module.exports = {
  Socket3,
};
