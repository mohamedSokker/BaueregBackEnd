const multer = require("multer");
const fs = require("fs");
let storage;
let dir = "";
let upload;

const uploadImg = (req, res) => {
  let dis = req.query.user;

  let directory = `${process.env.CURRENT_DIRECTORY}/users/${dis}`;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    //   console.log(req.query.url);
  }
  console.log(`dis: ${dis}`);
  try {
    storage = multer.diskStorage({
      destination: (req, file, callback) => {
        dir = `${process.env.CURRENT_DIRECTORY}/users/${dis}`;
        callback(null, dir);
      },
      filename: (req, file, callback) => {
        // console.log(file.originalname);
        callback(null, file.originalname);
      },
    });
    upload = multer({
      storage: storage,
    }).single("file");

    upload(req, res, (err) => {
      console.log(`reqUser = ${req.user}`, ` reqfile = ${req.file}`);
      if (err) {
        return res.send("Something gone wrong");
      }
      // res.send("Uploaded");
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadImg };
