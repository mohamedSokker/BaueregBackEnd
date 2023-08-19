const fs = require("fs");

const deleteFolder = (req, res) => {
  // console.log(req.query)
  try {
    if (fs.lstatSync(req.query.oldpath).isFile()) {
      fs.unlinkSync(req.query.oldpath);
      res.sendStatus(200);
      //   res.status(200).redirect(req.query.url);
    } else {
      fs.rmSync(req.query.oldpath, { recursive: true, force: true });
      res.sendStatus(200);
      //   res.status(200).redirect(req.query.url);
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

module.exports = { deleteFolder };
