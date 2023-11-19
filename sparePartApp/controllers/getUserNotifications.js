const { getData } = require("../../functions/getData");

const getUserNotifications = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    let query = `SELECT * FROM AppNotification WHERE ToUser = '${bodyData?.username}' ORDER BY DateTime DESC`;
    if (page && limit) {
      query += ` OFFSET ${
        (page - 1) * limit
      } ROWS FETCH NEXT ${limit} ROWS ONLY`;
    }
    console.log(query);
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserNotifications };
