const JSONStream = require("JSONStream");

const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getPosts = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    let usersData = [];
    if (model["AdminUsersApp"]) {
      usersData = model["AdminUsersApp"].filter(
        (item) => item.UserName === bodyData.username
      );
    } else {
      const query = `SELECT TOP 1 UserRole FROM AdminUsersApp WHERE UserName = '${bodyData.username}'`;
      usersData = (await getData(query)).recordsets[0];
    }

    const userRole = usersData[0]?.UserRole
      ? JSON.parse(usersData[0]?.UserRole)
      : [];

    let result = [];
    if (userRole?.Admin) {
      console.log("from Admin");
      if (page && limit) {
        if (model["AppStocksTransition"]) {
          result = model["AppStocksTransition"]
            .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        } else {
          const query = `SELECT * FROM AppStocksTransition`;
          result = (await getData(query)).recordsets[0]
            .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        }
      }
    } else if (userRole?.StockRes?.length > 0) {
      console.log("from Stock");
      if (page && limit) {
        if (model["AppStocksTransition"]) {
          result = model["AppStocksTransition"]
            .filter(
              (item) =>
                item.ItemFrom === userRole?.StockRes[0] ||
                item.ItemTo === userRole?.StockRes[0]
            )
            .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        } else {
          const query = `SELECT * FROM AppStocksTransition WHERE ItemFrom = '${userRole?.StockRes[0]}' OR ItemTo = '${userRole?.StockRes[0]}'`;
          result = (await getData(query)).recordsets[0]
            .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        }
      }
    } else if (userRole?.Editor?.StocksList?.length > 0) {
      console.log("from Stock list");
      if (page && limit) {
        if (model["AppStocksTransition"]) {
          result = model["AppStocksTransition"]
            .filter(
              (item) =>
                userRole?.Editor?.StocksList.includes(item.ItemFrom) ||
                userRole?.Editor?.StocksList.includes(item.ItemTo)
            )
            .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        } else {
          const query = `SELECT * FROM AppStocksTransition`;
          result = (await getData(query)).recordsets[0]
            .filter(
              (item) =>
                userRole?.Editor?.StocksList.includes(item.ItemFrom) ||
                userRole?.Editor?.StocksList.includes(item.ItemTo)
            )
            .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))
            .slice(
              (page - 1) * Number(limit),
              Number((page - 1) * Number(limit) + Number(limit))
            );
        }
      }
    }
    // console.log(result);
    console.log(`slice from ${(page - 1) * limit}`);
    console.log(
      `slice to ${Number((page - 1) * Number(limit) + Number(limit))}`
    );
    console.log(`result length ${result.length}`);
    return res.status(200).json(result);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts };
