// const { getData } = require("../../../functions/getData");
const { getAllData } = require("../../services/mainService");

const getNotification = async (req, res) => {
  try {
    const { username } = req.query;
    const allData = await getAllData(`AppMaintNotification`);
    const result = allData.filter(
      (item) => item.ToUser === username && item.Sent === "false"
    );
    // const query = `SELECT * FROM AppMaintNotification WHERE ToUser = '${username}' AND Sent = 'false' ORDER BY ID DESC`;
    // const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotification };
