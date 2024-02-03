const Jimp = require("jimp");

const connected = () => console.log("Client connected.");
const error = (err) => console.log(`Client Connection error => ${err.message}`);
const connectTimeout = () => console.log("Connection timeout.");
const authenticated = () => console.log("Client authenticated.");
const authError = () => console.log("Client authentication error.");
const bell = () => console.log("Bell received");
const disconnect = () => console.log("Client disconnected.");
const close = () => console.log("Client disconnected.");
const cutText = (text) => console.log("clipboard text received: " + text);
const firstFrameUpdate = () =>
  console.log("First Framebuffer update received.");
const rect = () => console.log("rect received.");
const colorMapUpdated = (colorMap) =>
  console.log("Color map updated. Colors: " + colorMap.length);
const rectProcessed = () => console.log("rect processed");
const frameUpdated = (client, io, port) => {
  console.log("Framebuffer updated.");
  new Jimp(
    {
      width: client.clientWidth,
      height: client.clientHeight,
      data: client.getFb(),
    },
    async (err, image) => {
      if (err) {
        console.log(`Image Error: ${err.message}`);
      }

      const imageBuffer = await image.getBase64Async(Jimp.MIME_JPEG);
      io.to(port.toString()).emit("screen-data", imageBuffer);
      // socket.emit("screen-data", imageBuffer);
    }
  );
};

const handleConnect = (client, io, port) => {
  client.on("connected", connected);

  client.on("error", error);

  // Connection timed out
  client.on("connectTimeout", connectTimeout);

  // Client successfully authenticated
  client.on("authenticated", authenticated);

  // Authentication error
  client.on("authError", authError);

  // Bell received from server
  client.on("bell", () => bell);

  // Client disconnected
  client.on("disconnect", disconnect);

  // Client disconnected
  client.on("close", close);

  // Clipboard event on server
  client.on("cutText", cutText);

  // Frame buffer updated
  client.on("firstFrameUpdate", firstFrameUpdate);

  // Frame buffer updated
  client.on("rect", rect);

  // Color map updated (8 bit color only)
  client.on("colorMapUpdated", colorMapUpdated);

  // Rect processed
  client.on("rectProcessed", rectProcessed);

  // Frame buffer updated
  client.on("frameUpdated", () => frameUpdated(client, io, port));
};

const handleDisconnect = (client, io, port) => {
  client.off("connected", connected);

  client.off("error", (err) => err);

  // Connection timed out
  client.off("connectTimeout", connectTimeout);

  // Client successfully authenticated
  client.off("authenticated", authenticated);

  // Authentication error
  client.off("authError", authError);

  // Bell received from server
  client.off("bell", () => bell);

  // Client disconnected
  client.off("disconnect", disconnect);

  // Client disconnected
  client.off("close", close);

  // Clipboard event on server
  client.off("cutText", cutText);

  // Frame buffer updated
  client.off("firstFrameUpdate", firstFrameUpdate);

  // Frame buffer updated
  client.off("rect", rect);

  // Color map updated (8 bit color only)
  client.off("colorMapUpdated", colorMapUpdated);

  // Rect processed
  client.off("rectProcessed", rectProcessed);

  // Frame buffer updated
  client.off("frameUpdated", () => frameUpdated(client, io, port));
};

module.exports = { handleConnect, handleDisconnect };
