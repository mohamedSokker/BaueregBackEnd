const fs = require("fs");
const multer = require("multer");
let storage;
let dir = "";
let upload;

const uploadItems = (req, res) => {
  // console.log(req.query)
  try {
    storage = multer.diskStorage({
      destination: (req, file, callback) => {
        dir = req.query.url;
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
        return res.sendStatus(500);
        // return res.send("Something gone wrong");
      }
      res.sendStatus(200);
      // res.send('Uploaded');
      //   res.status(200).redirect(req.query.path);
    });
  } catch (err) {
    console.error(err);
    res.end();
  }
};

module.exports = { uploadItems };
