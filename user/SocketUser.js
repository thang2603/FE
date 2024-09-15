const UserService = require("./UserService");
const TwoService = require("../vong2/TwoService");
const ThreeService = require("../vong3/ThreeService");
const FourService = require("../vong4/FourService");
const OneService = require("../vong1/OneService");
const SocketUser = async (io, socket) => {
  socket.on("createTableDatabase", async (msg) => {
    await UserService.createTableUser();
    await OneService.createTableQuestion();
    await OneService.createTableScore1();
    await OneService.createTableQuestionGroup();
    await TwoService.createTableQuestion();
    await TwoService.createTableAnswer2();
    await ThreeService.createTableQuestion();
    await ThreeService.createTableAnswer3();
    await FourService.createTableQuestion();
  });

  socket.on("nextWaitScreen", async (msg) => {
    io.emit("nextWaitScreenServer", "wait screen");
  });

  socket.on("listUserService", async (msg) => {
    const listUser = await UserService.getListUser();
    io.emit("listUserServiceServer", listUser);
  });

  socket.on("deleteUserService", async (msg) => {
    const res = await UserService.deleteUser(msg);
    const listUser = await UserService.getListUser();
    io.emit("listUserServiceServer", listUser);
  });

  socket.on("createUserService", async (msg) => {
    const userResults = await UserService.createUser(msg);
    const listUser = await UserService.getListUser();
    io.emit("listUserServiceServer", listUser);
    const idUser = userResults.insertId;
    const resUser2 = await TwoService.createUserInTableAnswer(idUser);
    const resUser3 = await ThreeService.createUserInTableAnswer(idUser);

    const resScore = await OneService.createUserInTableScore(idUser);
  });

  socket.on("updateUserService", async (msg) => {
    const res = await UserService.updateUser(msg);
    const listUser = await UserService.getListUser();
    io.emit("listUserServiceServer", listUser);
  });
};
module.exports = {
  SocketUser,
};
