const { getData } = require("../../../v3/helpers/getData");

const getPosts = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    const getUsersRoleQuery = `SELECT TOP 1 UserRole FROM AdminUsersApp WHERE UserName = '${bodyData.username}'`;
    const usersDataResult = await getData(getUsersRoleQuery);
    const usersData = usersDataResult.recordsets[0];

    let query = `SELECT * FROM AppStocksTransition `;
    let itemFromQuery = `ItemFrom IN `;
    let itemToQuery = `ItemTo IN `;
    let restItemQuery = ``;
    let finalItemQuery = ``;

    const userRole = usersData[0]?.UserRole
      ? JSON.parse(usersData[0]?.UserRole)
      : [];
    if (page && limit) {
      finalItemQuery = ` ORDER BY ID DESC OFFSET ${
        (page - 1) * limit
      } ROWS FETCH NEXT ${limit} ROWS ONLY`;
    }
    if (userRole?.Admin) {
      query = query;
    } else if (userRole?.StockRes?.length > 0) {
      query = `${query} WHERE (ItemFrom = '${userRole?.StockRes[0]}' OR ItemTo = '${userRole?.StockRes[0]}')`;
    } else if (userRole?.Editor?.StocksList?.length > 0) {
      // query = `SELECT * FROM AppStocksTransition WHERE `;
      for (let i = 0; i < userRole?.Editor?.StocksList?.length; i++) {
        if (userRole?.Editor?.StocksList.length === 1) {
          restItemQuery += `('${userRole?.Editor?.StocksList[i]}')`;
        } else if (i === 0) {
          restItemQuery += `('${userRole?.Editor?.StocksList[i]}',`;
        } else if (i === userRole?.Editor?.StocksList.length - 1) {
          restItemQuery += `'${userRole?.Editor?.StocksList[i]}')`;
        } else {
          restItemQuery += `'${userRole?.Editor?.StocksList[i]}',`;
        }
      }
      itemFromQuery += restItemQuery;
      itemToQuery += restItemQuery;
      query += ` WHERE (${itemFromQuery} OR ${itemToQuery})`;
    }
    query += finalItemQuery;
    console.log(query);
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts };
