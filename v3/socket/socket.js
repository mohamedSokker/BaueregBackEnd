const socketio = require("socket.io");

const {
  addConndection,
  client,
} = require("../services/web/VNC_Client1/vncClient");
const {
  handleDisconnect,
} = require("../services/web/VNC_Client1/handleConnection");

// const { availability } = require("../controllers/web/Dashboard/availability");

let portsCreated = [];

let io;

const socketFn = (server) => {
  let users = {};
  let rooms = {};

  io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`New Connection ${socket.id}`);

    socket.emit("userID", {
      id: socket.id,
      appVersion: 5,
      sparePartAppVersion: 2,
    });

    socket.emit("RequestUserName", "RequestUserName");

    socket.on("join-message", async (roomId) => {
      console.log("join-message triggered");
      socket.join(roomId);
      rooms = { ...rooms, [socket.id]: roomId };
      console.log(rooms);
      const port = Number(roomId);
      await addConndection(socket, port, portsCreated, io);
    });

    // socket.on("requestAvData", async () => {
    //   await availability(io);
    // });

    socket.on("leave-room", (roomId) => {
      delete rooms[socket?.id];
      if (Object.keys(rooms).length === 0) {
        console.log(client._connected);
        portsCreated = [];
        handleDisconnect(client, io, 8000, portsCreated);
        if (client._connected) client.resetState();
        console.log("Disconnected", client._connected);
      }
      socket.leave(roomId);
    });

    socket.on("type", function (data) {
      var room = JSON.parse(data).room;
      socket.broadcast.to(room).emit("type", data);
    });

    socket.on("userName", (data) => {
      console.log(`New Connection ${data} => ${socket.id}`);
      users = { ...users, [socket.id]: data };
      console.log(users);
    });

    socket.on("scanned", (data) => {
      socket.to(data.split("==")[1]).emit("checkScan", data);
    });

    socket.on("successScan", (data1) => {
      socket.to(data1?.data?.split("==")[0]).emit("confirmScan", data1);
    });

    socket.on("updateAppData", (data) => {
      socket.broadcast.emit("appDataUpdate", data);
    });

    socket.on("appNewMaint", (data) => {
      socket.broadcast.emit("appNewMessage", data);
    });

    socket.on("appFinishedMaint", (data) => {
      socket.broadcast.emit("appFinishedMessage", data);
    });

    socket.on("TaskEdited", (data) => {
      console.log(data);
      socket.broadcast.emit("UpdateTask", data);
    });

    socket.on("disconnect", () => {
      console.log(`${users[socket?.id]} Connection Lost`);
      delete rooms[socket?.id];
      delete users[socket?.id];
      console.log(rooms);
      if (Object.keys(rooms).length === 0) {
        console.log(client._connected);
        portsCreated = [];
        handleDisconnect(client, io, 8000, portsCreated);
        if (client._connected) client.resetState();
        console.log("Disconnected", client._connected);
      }
    });
  });
};

module.exports = { socketFn, io };
