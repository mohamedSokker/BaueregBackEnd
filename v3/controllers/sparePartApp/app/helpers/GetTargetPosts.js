const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getTargetPosts = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;

    const userRole = bodyData?.usersData?.roles
      ? bodyData?.usersData?.roles
      : [];

    let result = [];
    if (userRole?.Admin) {
      if (page && limit) {
        if (model["AppStocksTransition"]) {
          result = model["AppStocksTransition"]
            .filter((item) => item.Code == bodyData.Code)
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        } else {
          const query = `SELECT * FROM AppStocksTransition WHERE Code = '${bodyData?.Code}'`;
          result = (await getData(query)).recordsets[0].slice(
            (page - 1) * Number(limit),
            Number((page - 1) * Number(limit) + Number(limit))
          );
        }
      }
    } else if (userRole?.StockRes?.length > 0) {
      if (page && limit) {
        if (model["AppStocksTransition"]) {
          result = model["AppStocksTransition"]
            .filter(
              (item) =>
                item.Code === bodyData.Code &&
                (item.ItemFrom === userRole?.StockRes[0] ||
                  item.ItemTo === userRole?.StockRes[0])
            )
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        } else {
          const query = `SELECT * FROM AppStocksTransition WHERE Code = '${bodyData?.Code}' 
                        AND (ItemFrom = '${userRole?.StockRes[0]}' 
                        OR ItemTo = '${userRole?.StockRes[0]}')`;
          result = (await getData(query)).recordsets[0].slice(
            (page - 1) * Number(limit),
            Number((page - 1) * Number(limit) + Number(limit))
          );
        }
      }
    } else if (userRole?.Editor?.StocksList?.length > 0) {
      if (page && limit) {
        if (model["AppStocksTransition"]) {
          result = model["AppStocksTransition"]
            .filter(
              (item) =>
                item.Code === bodyData.Code &&
                (userRole?.Editor?.StocksList.includes(item.ItemFrom) ||
                  userRole?.Editor?.StocksList.includes(item.ItemFrom))
            )
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        } else {
          const query = `SELECT * FROM AppStocksTransition WHERE Code = '${bodyData?.Code}'`;
          result = (await getData(query)).recordsets[0]
            .filter(
              (item) =>
                userRole?.Editor?.StocksList.includes(item.ItemFrom) ||
                userRole?.Editor?.StocksList.includes(item.ItemFrom)
            )
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        }
      }
    }
    // console.log(userRole?.StockRes[0]);
    // console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetPosts };
