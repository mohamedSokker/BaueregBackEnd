// const { Client } = require("ssh2");
// const RFB = require("rfb2");

// const vncConfig = {
//   host: "127.0.0.1", // VNC server host
//   port: 8000, // VNC server port
// };

// const sshConfig = {
//   host: "192.168.1.7",
//   port: 22,
//   username: "osama",
//   password: "sokker999",
// };

// const ssh = new Client();

// ssh.on("ready", () => {
//   console.log("SSH connection established");

//   ssh.forwardIn("127.0.0.1", vncConfig.port, (err, stream) => {
//     if (err) throw err;

//     const rfb = RFB.createConnection({
//       host: vncConfig.host,
//       port: stream.localPort,
//       //   password: "your-vnc-password", // VNC server password
//     });

//     rfb.on("connect", () => {
//       console.log("VNC connection established");
//     });

//     rfb.on("rect", (rect) => {
//       // Handle received rectangles (screen updates)
//       // rect contains pixel data, position, and dimensions
//       console.log("Received screen update:", rect);
//     });

//     rfb.on("error", (err) => {
//       console.error("VNC connection error:", err);
//       ssh.end();
//     });

//     rfb.on("end", () => {
//       console.log("VNC connection closed");
//       ssh.end();
//     });
//   });
// });

// ssh.on("error", (err) => {
//   console.error("SSH connection error:", err);
// });

// ssh.on("close", () => {
//   console.log("SSH connection closed");
// });

// ssh.connect(sshConfig);
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsAoptions");
const credentials = require("./middleware/credentials");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const socketio = require("socket.io");
const dotenv = require("dotenv").config();
const { cache } = require("./routeCache");
const fs = require("fs");
const { Client } = require("ssh2");
const http = require("http");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine("html", require("ejs").renderFile);

app.use(credentials);

app.use(cors(corsOptions));

app.use(cookieParser());

const hostIP = "sokker@192.168.1.5";
const { spawn } = require("child_process");

app.get("/create-tunnel", (req, res) => {
  const ssh = spawn("ssh", ["-fN", "-Rvvv", "8000:192.168.1.8:5900", hostIP]);
  ssh.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ssh.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  setTimeout(() => ssh.stdin.write("pwd"), 2000);

  ssh.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  ssh.on("exit", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  process.on("SIGINT", () => {
    // Send SIGTERM to the child process to gracefully terminate the SSH connection
    ssh.kill("SIGTERM");
  });

  process.on("exit", () => {
    ssh.kill();
  });
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server is listening on port 5001");
});
