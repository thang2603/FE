const UserService = require("./UserService");
const SocketUser = async (io, socket) => {
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
    const res = await UserService.createUser(msg);
    const listUser = await UserService.getListUser();
    io.emit("listUserServiceServer", listUser);
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
