const { getData } = require("../../functions/getData");

const handleReport = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `INSERT INTO TaskManagerReports VALUES(
        GETDATE(),
        '${bodyData.eqType}',
        '${bodyData.eqModel}',
        '${bodyData.eq}',
        '${JSON.stringify(bodyData.selectedData)}',
        '${bodyData.userName}',
        '${bodyData.userImage}',
        'false',
        'false'
    )`;
    const data = await getData(query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleReport };
