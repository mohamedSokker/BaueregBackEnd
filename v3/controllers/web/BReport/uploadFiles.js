const fs = require("fs");
const multer = require("multer");
const path = require("path");
let storage;
let dir = "";
let upload;

const uploadItems = (req, res) => {
  try {
    const startPath = req.query.url;
    const fullpath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "files",
      "BReport",
      startPath
    );
    if (fs.existsSync(fullpath)) {
      storage = multer.diskStorage({
        destination: (req, file, callback) => {
          dir = fullpath;
          callback(null, dir);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      });
      upload = multer({
        storage: storage,
        limits: { fileSize: 2 * 1024 * 1024 * 1024 },
        fileFilter: (req, file, callback) => {
          file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
          );
          callback(null, true);
        },
      }).array("files", 50);
      upload(req, res, (err) => {
        if (err) {
          throw new Error(err.message);
        }
        return res.status(200).json({ message: "Success" });
      });
    } else {
      throw new Error(`No Such Directory`);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadItems };
