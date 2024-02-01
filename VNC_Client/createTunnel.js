const Client = require("ssh2").Client;
const net = require("net");
const fs = require("fs");

const sshConfig = {
  host: "mhsokker.ddnsfree.com",
  port: 22,
  username: "osama",
  privateKey: fs.readFileSync("/home/mohamed/.ssh/id_rsa"),
};

let conn = null;

async function createTunnel(port) {
  if (!conn) {
    const localAddress = "127.0.0.1";
    const localPort = 8001;
    const remoteAddress = "127.0.0.1";
    const remotePort = port;
    return new Promise((resolve, reject) => {
      conn = new Client();

      conn.on("ready", () => {
        console.log(
          "SSH connection established. Creating local port forward..."
        );

        // Create a TCP server that listens on 127.0.0.1:8001
        const server = net.createServer((localStream) => {
          conn.forwardOut(
            localAddress,
            localPort,
            remoteAddress,
            remotePort,
            (err, stream) => {
              if (err) {
                console.error("Error creating local port forward:", err);
                conn.end();
                server.close();
                reject(err);
              }
              console.log(`Forwarded`);

              // Pipe the local connection to the remote server through the SSH tunnel
              localStream.pipe(stream).pipe(localStream);
            }
          );
        });

        // Handle local server close event
        server.on("close", () => {
          console.log("Local port forward server closed");
        });

        // Handle local server error event
        server.on("error", (err) => {
          console.error("Local port forward server error:", err);
          conn.end();
          reject(err);
        });

        // Listen for the 'listening' event to ensure the server is fully ready
        server.listen(localPort, localAddress, () => {
          console.log(
            `Local port forward server listening on ${localAddress}:${localPort}`
          );
          resolve({ server, conn });
        });
      });

      // Handle SSH connection close event
      conn.on("close", () => {
        console.log("SSH connection closed");
      });

      // Handle SSH connection error event
      conn.on("error", (err) => {
        console.error("SSH connection error:", err);
        reject(err);
      });

      conn.connect(sshConfig);
    });
  }
}

module.exports = { createTunnel };
