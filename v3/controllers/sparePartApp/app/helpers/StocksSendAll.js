const { getData } = require("../../../../helpers/getData");

const stocksSendAll = async (req, res) => {
  try {
    const bodyData = req.body;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { stocksSendAll };
