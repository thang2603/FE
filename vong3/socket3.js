const OneService = require("../vong1/OneService");
const ThreeService = require("../vong3/ThreeService");
const Socket3 = async (io, socket) => {
  socket.on("listUser3", async (msg) => {
    const listUser = await OneService.getListUser();
    io.emit("listUserServer3", listUser);
    console.log(listUser);
    for (let i = 0; i < listUser.length; i++) {
      let msg = listUser[i];
      const res = await ThreeService.updateAnswer("", msg.id, "0");
    }
  });

  socket.on("listQuestion3", async (msg) => {
    console.log(msg);
    const listQuestion = await ThreeService.getListQuestion();
    console.log(listQuestion);
    io.emit("listQuestionServer3", listQuestion);
  });

  socket.on("question3", async (msg) => {
    const question = await ThreeService.getQuestion(msg.no);
    const listImage = await ThreeService.getImage(msg.idQues);
    const data = { ...question[0], image: listImage };
    io.emit("questionServer3", data);
    console.log(data);
  });

  socket.on("startControl3", async (msg) => {
    io.emit("startTimeServer3", msg);
  });

  socket.on("answer3", async (msg) => {
    const res = await ThreeService.updateAnswer(
      msg.ans,
      msg.idUser,
      msg?.updateAt
    );
  });

  socket.on("updateScore3", async (msg) => {
    io.emit("correctServer3", msg);
    for (let i = 0; i < msg.length; i++) {
      const res1 = await OneService.updateScoreGame(
        msg[i].score + msg[i].updateScore,
        msg[i].id
      );
    }
  });

  socket.on("showResult3", async (msg) => {
    const res = await ThreeService.getAnswer();
    io.emit("showResultServer3", res);
  });

  socket.on("getAllQuestion3", async (msg) => {
    const listQuestion = await ThreeService.getListQuestion();
    console.log(listQuestion);
    io.emit("getAllQuestionServer3", listQuestion);
  });

  socket.on("createQuestion3", async (msg) => {
    const res = await ThreeService.createQuestion(msg);
    const idQues = res?.insertId;
    const listImage = msg?.image;
    for (let i = 0; i < listImage.length; i++) {
      const resImage = await ThreeService.createImage(
        listImage[i].link,
        idQues
      );
    }
    const listQuestion = await ThreeService.getListQuestion();
    io.emit("getAllQuestionServer3", listQuestion);
  });

  socket.on("updateQuestion3", async (msg) => {
    const res = await ThreeService.updateQuestion(msg);
    const listImage = msg?.image;
    console.log(listImage);
    for (let i = 0; i < listImage.length; i++) {
      let itemImage = listImage[i];
      if (itemImage.status === "edit") {
        const resImage = await ThreeService.updateIamge(
          itemImage.id,
          itemImage.link
        );
      } else if (itemImage.status === "delete") {
        const resImage = await ThreeService.deleteImage(itemImage.id);
      } else if (itemImage.status === "add") {
        const resImage = await ThreeService.createImage(itemImage.link, msg.id);
      }
    }

    const listQuestion = await ThreeService.getListQuestion();
    io.emit("getAllQuestionServer3", listQuestion);
  });

  socket.on("deleteQuestion3", async (data) => {
    const res = await ThreeService.deleteQuestion(data);
    const listQuestion = await ThreeService.getListQuestion();
    io.emit("getAllQuestionServer3", listQuestion);
  });
  socket.on("next4", async (msg) => {
    io.emit("nextServer4", "next4");
    io.emit("nextGameFromSever", "/vong/4/user");
  });

  socket.on("startRound3", async (msg) => {
    io.emit("startRoundServer3", "next4");
  });

  socket.on("startSoundQuestion3", async (msg) => {
    io.emit("startSoundQuestionServer3", "next4");
  });

  socket.on("sound10Second", async (msg) => {
    io.emit("sound10SecondServer3", "next4");
  });

  socket.on("sound20Second", async (msg) => {
    io.emit("sound20SecondServer3", "next4");
  });

  socket.on("sound30Second", async (msg) => {
    io.emit("sound30SecondServer3", "next4");
  });

  socket.on("sound40Second", async (msg) => {
    io.emit("sound40SecondServer3", "next4");
  });

  socket.on("soundCorrect3", async (msg) => {
    io.emit("soundCorrectServer3", "next4");
  });
};

module.exports = {
  Socket3,
};
