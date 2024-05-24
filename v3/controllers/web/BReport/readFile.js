const fs = require("fs");
const path = require("path");

const readFile = async (req, res) => {
  const filePath = req.body.path;
  const fullPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "/files",
    "BReport",
    filePath
  );
  const readStream = fs.createReadStream(fullPath, { encoding: "ascii" });
  readStream.pipe(res);
};

module.exports = { readFile };
