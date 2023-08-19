const fs = require("fs");

const createFolder = (req, res) => {
  // console.log(req.query)
  // console.log(req.query.url);
  try {
    if (!fs.existsSync(req.query.fullpath)) {
      fs.mkdirSync(req.query.fullpath);
      res.sendStatus(200);
      //   console.log(req.query.url);
      //   res.status(200).redirect(req.query.url);
    }
    // res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
};

module.exports = { createFolder };
