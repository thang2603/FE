const FiveService = require("../vong5/FiveService");

const Socket5 = async (io, socket) => {
  socket.on("addUserGame5", async (msg) => {
    const resCreate = await FiveService.createUserGame5(msg);
    const res = await FiveService.getListUserGame5();
    const newData = res?.map((item) => item?.idUser);
    io.emit("listUserGameServer5", newData);
  });

  socket.on("deleteUserGame5", async (msg) => {
    const resDelete = await FiveService.deleteUserGame5(msg);
    const res = await FiveService.getListUserGame5();
    const newData = res?.map((item) => item?.idUser);
    io.emit("listUserGameServer5", newData);
  });

  socket.on("listUser4", async (msg) => {
    const res = await FiveService.getListUserGame5();
    const newData = res?.map((item) => item?.idUser);
    io.emit("listUserGameServer5", newData);
  });

  socket.on("listQuestion5", async (msg) => {
    const res = await FiveService.getListQuestion5();
    io.emit("listQuestionServer5", res);
  });

  socket.on("creatQuestion5", async (msg) => {
    const resCreate = await FiveService.createQuestion5(msg);
    const res = await FiveService.getListQuestion5();
    io.emit("listQuestionServer5", res);
  });

  socket.on("deleteQuestion5", async (msg) => {
    const resCreate = await FiveService.deleteQuestion5(msg);
    const res = await FiveService.getListQuestion5();
    io.emit("listQuestionServer5", res);
  });

  socket.on("updateQuestion5", async (msg) => {
    const resCreate = await FiveService.updateQuestion(msg);
    const res = await FiveService.getListQuestion5();
    io.emit("listQuestionServer5", res);
  });

  socket.on("quesGame5", async (msg) => {
    const res = await FiveService.getQuestion5(msg);
    io.emit("questionServer5", res[0]);
  });

  socket.on("listUserGame5", async (msg) => {
    const res = await FiveService.getListUser();
    io.emit("listUserGameServer5", res);
  });

  socket.on("pressRung5", async (msg) => {
    io.emit("pressRungServer5", msg);
  });
};

module.exports = {
  Socket5,
};
