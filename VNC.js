const { Client } = require("ssh2");
const RFB = require("rfb2");

const vncConfig = {
  host: "127.0.0.1", // VNC server host
  port: 8000, // VNC server port
};

const sshConfig = {
  host: "192.168.1.7",
  port: 22,
  username: "osama",
  password: "sokker999",
};

const ssh = new Client();

ssh.on("ready", () => {
  console.log("SSH connection established");

  ssh.forwardIn("127.0.0.1", vncConfig.port, (err, stream) => {
    if (err) throw err;

    const rfb = RFB.createConnection({
      host: vncConfig.host,
      port: stream.localPort,
      //   password: "your-vnc-password", // VNC server password
    });

    rfb.on("connect", () => {
      console.log("VNC connection established");
    });

    rfb.on("rect", (rect) => {
      // Handle received rectangles (screen updates)
      // rect contains pixel data, position, and dimensions
      console.log("Received screen update:", rect);
    });

    rfb.on("error", (err) => {
      console.error("VNC connection error:", err);
      ssh.end();
    });

    rfb.on("end", () => {
      console.log("VNC connection closed");
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
