const { getData } = require("../../functions/getData");

const getTargetPosts = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    const getUsersRoleQuery = `SELECT TOP 1 UserRole FROM AdminUsersApp WHERE UserName = '${bodyData.username}'`;
    const usersDataResult = await getData(getUsersRoleQuery);
    const usersData = usersDataResult.recordsets[0];

    let query = ``;
    let itemFromQuery = `ItemFrom IN `;
    let itemToQuery = `ItemTo IN `;
    let restItemQuery = ``;

    const userRole = usersData[0]?.UserRole
      ? JSON.parse(usersData[0]?.UserRole)
      : [];
    if (page && limit) {
      let startCount = (Number(page) - 1) * Number(limit) + 1;
      let endCount = Number(startCount) + Number(limit) - 1;
      query = `WITH RowNo AS (SELECT ROW_NUMBER() OVER (ORDER BY ID DESC) AS rowno, 
            * FROM AppStocksTransition WHERE Code = '${bodyData?.Code}') SELECT * FROM RowNo WHERE RowNo BETWEEN ${startCount} AND  ${endCount} `;
    }
    if (userRole?.Admin) {
      query = query;
    } else if (userRole?.StockRes?.length > 0) {
      query = `${query} AND (ItemFrom = '${userRole?.StockRes[0]}' OR ItemTo = '${userRole?.StockRes[0]}')`;
      console.log(query);
    } else if (userRole?.Editor?.StocksList?.length > 0) {
      query = `SELECT * FROM AppStocksTransition WHERE `;
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
      query += `AND (${itemFromQuery} OR ${itemToQuery})`;
      console.log(query);
    }
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetPosts };
