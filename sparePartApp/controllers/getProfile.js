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
        query = `SELECT ID, OrderNo, FORMAT(DateTime, 'yyyy-MM-dd hh:mm:ss') AS DateTime,
                 FromStore,Confirmed FROM AppPlaceOrder WHERE Confirmed = 'true'
                 ORDER BY ID DESC OFFSET ${
                   (page - 1) * limit
                 } ROWS FETCH NEXT ${limit} ROWS ONLY`;
      }
    } else {
      if (page && limit) {
        query = `SELECT  ID, OrderNo, FORMAT(DateTime, 'yyyy-MM-dd hh:mm:ss') AS DateTime,
          FromStore,Confirmed FROM AppPlaceOrder 
          WHERE ToUser = '${bodyData?.usersData?.username}' OR
          FromStore = '${
            bodyData?.usersData?.roles?.StockRes &&
            bodyData?.usersData?.roles?.StockRes[0]
          }' ORDER BY ID DESC OFFSET ${
          (page - 1) * limit
        } ROWS FETCH NEXT ${limit} ROWS ONLY`;
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
