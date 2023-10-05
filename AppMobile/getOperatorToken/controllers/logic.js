const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const { username } = req.body;
    const query = `SELECT Token FROM AppMaintUsers WHERE UserName = '${username}'`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
