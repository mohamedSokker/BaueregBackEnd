const multer = require("multer");
const fs = require("fs");
let storage;
let dir = "";
let upload;

const appUploadImg = (req, res) => {
  try {
    let dis = req.query.user;

    let directory = `${process.env.ABS_PATH}/MaintApp/users/${dis}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    storage = multer.diskStorage({
      destination: (req, file, callback) => {
        dir = directory;
        callback(null, dir);
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    });
    upload = multer({
      storage: storage,
    }).single("file");

    upload(req, res, (err) => {
      if (err) {
        throw new Error(`Somethings Wrong`);
      }
      return res.status(200).json({ message: "Success" });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { appUploadImg };
