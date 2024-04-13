const fs = require('fs');
const multer = require('multer');
let storage;
let dir = '';
let upload;

const createItem = (req,res) => {
    // console.log(req.query)
    // console.log(req.query.url);
    try {
        if (!fs.existsSync(req.query.fullpath)) {
          fs.mkdirSync(req.query.fullpath);
        //   console.log(req.query.url);
          res.status(200).redirect(req.query.url);
        }
        // res.end();
      } catch (err) {
        console.error(err);
        res.end();
      }
  }

  const renameItem = (req,res) => {
    // console.log(req.query)
    // console.log(req.query.url);
    try {
        // if (!fs.existsSync(req.query.oldpath)) {
          fs.rename(req.query.oldpath,req.query.newpath, () => {
            res.status(200).redirect(req.query.url);
          })
        //   console.log(req.query.url);
        // }
    } catch (err) {
        console.error(err);
        res.end();
      }
  }

  const deleteItem = (req,res) => {
    // console.log(req.query)
    try {
      if (fs.lstatSync(req.query.oldpath).isFile()) {
        fs.unlinkSync(req.query.oldpath);
        res.status(200).redirect(req.query.url);
      } else {
        fs.rmSync(req.query.oldpath, { recursive: true, force: true });
        res.status(200).redirect(req.query.url);
      }
    } catch (err) {
        console.error(err);
        res.end();
      }
  }

  const uploadItems = (req,res) => {
    // console.log(req.query)
    console.log(req.file)
    try {
      storage = multer.diskStorage({
        destination: (req,file,callback) => {
          dir = req.query.url;
          callback(null,dir);
        },
        filename: (req,file,callback) => {
          callback(null, file.originalname);
        }
      });
      upload = multer({
        storage: storage,
        limits: { fileSize: 2 * 1024 * 1024 * 1024 },
        fileFilter: (req,file,callback) => {
          console.log(file)
          file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
          callback(null, true)
        }
        }).array('files', 50);
      upload(req,res, (err) => {
        if (err) {
          return res.send('Something gone wrong');
        }
        // res.send('Uploaded');
        res.status(200).redirect(req.query.path);
      })
    } catch (err) {
      console.error(err);
      res.end();
    }
  }

  module.exports = {
    createItem,
    renameItem,
    deleteItem,
    uploadItems
  }