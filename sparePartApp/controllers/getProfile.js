const { getData } = require("../../functions/getData");

const getProfile = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;

    let query = ``;
    if (
      bodyData.usersData?.roles?.StockRes &&
      bodyData?.usersData?.roles?.StockRes[0] === "Main"
    ) {
      if (page && limit) {
        let startCount = (Number(page) - 1) * Number(limit) + 1;
        let endCount = Number(startCount) + Number(limit) - 1;
        query = `WITH RowNo AS (SELECT ROW_NUMBER() OVER (ORDER BY ID DESC) AS rowno, 
             ID, OrderNo, FORMAT(DateTime, 'yyyy-MM-dd hh:mm:ss') AS DateTime,
          FromStore,Confirmed FROM AppPlaceOrder WHERE Confirmed = 'true') 
          SELECT * FROM RowNo WHERE RowNo BETWEEN ${startCount} AND  ${endCount}`;
      }
    } else {
      if (page && limit) {
        let startCount = (Number(page) - 1) * Number(limit) + 1;
        let endCount = Number(startCount) + Number(limit) - 1;
        query = `WITH RowNo AS (SELECT ROW_NUMBER() OVER (ORDER BY ID DESC) AS rowno, 
             ID, OrderNo, FORMAT(DateTime, 'yyyy-MM-dd hh:mm:ss') AS DateTime,
          FromStore,Confirmed FROM AppPlaceOrder 
          WHERE ToUser = '${bodyData?.usersData?.username}' OR
          FromStore = '${
            bodyData?.usersData?.roles?.StockRes &&
            bodyData?.usersData?.roles?.StockRes[0]
          }') 
          SELECT * FROM RowNo WHERE RowNo BETWEEN ${startCount} AND  ${endCount} `;
      }
    }

    console.log(query);
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile };
