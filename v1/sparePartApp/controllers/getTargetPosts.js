const { getData } = require("../../../v3/helpers/getData");

const getTargetPosts = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    // const getUsersRoleQuery = `SELECT TOP 1 UserRole FROM AdminUsersApp WHERE UserName = '${bodyData.username}'`;
    // const usersDataResult = await getData(getUsersRoleQuery);
    // const usersData = usersDataResult.recordsets[0];

    let query = `SELECT * FROM AppStocksTransition WHERE Code = '${bodyData?.Code}' `;
    let itemFromQuery = `ItemFrom IN `;
    let itemToQuery = `ItemTo IN `;
    let restItemQuery = ``;
    let finalItemQuery = ``;

    console.log(bodyData?.usersData?.roles);

    const userRole = bodyData?.usersData?.roles
      ? bodyData?.usersData?.roles
      : [];
    if (page && limit) {
      finalItemQuery = ` ORDER BY ID DESC OFFSET ${
        (page - 1) * limit
      } ROWS FETCH NEXT ${limit} ROWS ONLY`;
    }
    if (userRole?.Admin) {
      query = query;
      console.log(`from Admin`);
    } else if (userRole?.StockRes?.length > 0) {
      query = `${query} AND (ItemFrom = '${userRole?.StockRes[0]}' OR ItemTo = '${userRole?.StockRes[0]}')`;
      console.log(`from Stock`);
    } else if (userRole?.Editor?.StocksList?.length > 0) {
      console.log(`from User`);
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

module.exports = { getTargetPosts };
