const { getAllData } = require("../../services/mainService");

const logic = async (req, res) => {
  try {
    const { username } = req.body;
    const allData = await getAllData("AppMaintUsers");
    const filteredData = allData.filter((item) => item.UserName === username);
    const result = [];
    filteredData.map((d) => {
      result.push({ Token: d.Token });
    });
    // const query = `SELECT Token FROM AppMaintUsers WHERE UserName = '${username}'`;
    // const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
