const fs = require("fs");
const path = require("path");

const renameFile = (req, res) => {
  try {
    const startPath = req.body.path;
    const endPath = req.body.endPath;
    const fullpath = `/home/mohamed/bauereg/OilSamplesAnalyzed/Bauer/${startPath}`;
    const newPath = `/home/mohamed/bauereg/OilSamplesAnalyzed/Bauer/${endPath}`;
    fs.renameSync(fullpath, newPath);
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { renameFile };
