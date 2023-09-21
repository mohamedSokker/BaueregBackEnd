const { getData } = require("../../../functions/getData");

const updateNotification = async (req, res) => {
  try {
    const fieldsData = req.body;
    console.log(fieldsData);
    const query = `UPDATE AppMaintNotification SET Sent = 'true' WHERE ID = '${fieldsData?.ID}'`;
    const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateNotification };
