const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getProfile = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    let result = [];
    if (
      bodyData.usersData?.roles?.StockRes &&
      bodyData?.usersData?.roles?.StockRes[0] === "Main"
    ) {
      if (page && limit) {
        if (model["AppPlaceOrder"]) {
          result = model["AppPlaceOrder"]
            .filter((item) => item.Confirmed === "true")
            .slice((page - 1) * limit, (page - 1) * limit + limit);
        } else {
          const query = `SELECT ID, OrderNo, FORMAT(DateTime, 'yyyy-MM-dd hh:mm:ss') AS DateTime,
                 FromStore,Confirmed FROM AppPlaceOrder WHERE Confirmed = 'true'
                 ORDER BY ID DESC OFFSET ${
                   (page - 1) * limit
                 } ROWS FETCH NEXT ${limit} ROWS ONLY`;
          result = (await getData(query)).recordsets[0];
        }
      }
    } else {
      if (page && limit) {
        if (model["AppPlaceOrder"]) {
          result = model["AppPlaceOrder"]
            .filter(
              (item) =>
                item.ToUser === bodyData?.usersData?.username ||
                (item.FromStore === bodyData?.usersData?.roles?.StockRes &&
                  bodyData?.usersData?.roles?.StockRes[0])
            )
            .slice((page - 1) * limit, (page - 1) * limit + limit);
        } else {
          const query = `SELECT  ID, OrderNo, FORMAT(DateTime, 'yyyy-MM-dd hh:mm:ss') AS DateTime,
          FromStore,Confirmed FROM AppPlaceOrder 
          WHERE ToUser = '${bodyData?.usersData?.username}' OR
          FromStore = '${
            bodyData?.usersData?.roles?.StockRes &&
            bodyData?.usersData?.roles?.StockRes[0]
          }' ORDER BY ID DESC OFFSET ${
            (page - 1) * limit
          } ROWS FETCH NEXT ${limit} ROWS ONLY`;
          result = (await getData(query)).recordsets[0];
        }
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile };
