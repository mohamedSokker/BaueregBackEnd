const { uploadFiles } = require("../../../helpers/uploadFiles");

const uploadItems = async (req, res) => {
  try {
    const startPath = req.query.url;
    const fullpath = `/home/mohamed/bauereg/TaskManagerTasks/${startPath}`;
    await uploadFiles(req, res, fullpath);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadItems };
