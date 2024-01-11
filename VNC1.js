const { Client } = require("ssh2");
const http = require("http");
const WebSocket = require("ws");
const express = require("express");
const { RFB } = require("novnc-node");

const vncConfig = {
  host: "127.0.0.1", // VNC server host
  port: 5901, // VNC server port
};

const sshConfig = {
  host: "your-ssh-host",
  port: 22,
  username: "your-ssh-username",
  password: "your-ssh-password",
};

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  const rfb2ws = new RFB(ws);

  rfb2ws.connect("127.0.0.1", vncConfig.port, {
    password: "your-vnc-password",
  }); // VNC server password

  ws.on("close", () => {
    rfb2ws.end();
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const ssh = new Client();

ssh.on("ready", () => {
  console.log("SSH connection established");

  ssh.forwardIn("127.0.0.1", vncConfig.port, (err, stream) => {
    if (err) throw err;

    console.log("Tunnel established");

    stream.on("close", () => {
      console.log("Tunnel closed");
      server.close();
      ssh.end();
    });
  });
});

ssh.on("error", (err) => {
  console.error("SSH connection error:", err);
});

ssh.on("close", () => {
  console.log("SSH connection closed");
});

ssh.connect(sshConfig);
