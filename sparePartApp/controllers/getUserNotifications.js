const { getData } = require("../../functions/getData");

const getUserNotifications = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    let query = `SELECT * FROM AppNotification WHERE ToUser = '${bodyData?.username}' ORDER BY DateTime DESC`;
    if (page && limit) {
      let startCount = (Number(page) - 1) * Number(limit) + 1;
      let endCount = Number(startCount) + Number(limit) - 1;
      query = `WITH RowNo AS (SELECT ROW_NUMBER() OVER (ORDER BY ID DESC) AS rowno, 
            * FROM AppNotification WHERE ToUser = '${bodyData?.username}')
            SELECT * FROM RowNo WHERE RowNo BETWEEN ${startCount} AND  ${endCount} `;
    }
    const result = await getData(query);
    console.log(result.recordsets[0]);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserNotifications };
