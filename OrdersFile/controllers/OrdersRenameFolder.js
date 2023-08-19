const fs = require("fs");

const renameFolder = (req, res) => {
  // console.log(req.query)
  // console.log(req.query.url);
  try {
    // if (!fs.existsSync(req.query.oldpath)) {
    fs.rename(req.query.oldpath, req.query.newpath, () => {
      res.sendStatus(200);
      //   res.status(200).redirect(req.query.url);
    });
    //   console.log(req.query.url);
    // }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

module.exports = { renameFolder };
