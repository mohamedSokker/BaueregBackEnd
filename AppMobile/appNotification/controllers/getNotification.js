const { getData } = require("../../../functions/getData");

const getNotification = async (req, res) => {
  try {
    const { username } = req.query;
    const query = `SELECT * FROM AppMaintNotification WHERE ToUser = '${username}' AND Sent = 'false'`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotification };
