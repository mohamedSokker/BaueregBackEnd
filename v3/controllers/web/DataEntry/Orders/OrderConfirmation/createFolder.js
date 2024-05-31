const fs = require("fs");

const createFolder = (req, res) => {
  try {
    // console.log(req.body);
    // const basePathArray = req.body.fullpath.split("/");
    // const basePath = basePathArray[basePathArray.length - 1];
    const basePath = req.body.fullpath;
    const fullpath = `/home/mohamed/bauereg/Orders/Bauer/Order Confirmation/${basePath}`;
    if (!fs.existsSync(fullpath)) {
      fs.mkdirSync(fullpath);
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(400).json({ message: "Invaild Path" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createFolder };
