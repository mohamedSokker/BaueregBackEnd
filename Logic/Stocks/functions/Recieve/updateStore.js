const { getData } = require("../../../../functions/getData");

const updateStore = async (bodyData) => {
  const fromQuery = `UPDATE AppStocksTransition SET IsPending = 'false' WHERE
    ID = '${bodyData.TransID}'`;
  const searchQuery = `SELECT TOP 1 * FROM AppStocks WHERE Code = '${bodyData.Code}'
  AND Store = '${bodyData.ItemTo}'`;
  try {
    const searchResult = await getData(searchQuery);
    // await sql.connect(config);
    // const searchResult = await sql.query(searchQuery);
    let toQuery = ``;
    if (searchResult.rowsAffected[0] === 0) {
      toQuery = `INSERT INTO AppStocks VALUES ('${bodyData.Code}',
      '${bodyData.SabCode}', '${bodyData.Unit}', '1',
      '${bodyData.ItemTo}', '${bodyData.Description}', '${bodyData.Detail}', '')`;
    } else {
      toQuery = `UPDATE AppStocks SET Quantity = 
      '${Number(searchResult.recordsets[0][0][`Quantity`]) + 1}' 
      WHERE ID = '${searchResult.recordsets[0][0][`ID`]}'`;
    }

    const notificationQuery = await updateNotification(bodyData);

    const result = await getData(
      `${fromQuery} ${toQuery} ${notificationQuery}`
    );
    // await sql.connect(config);
    // const result = await sql.query(
    //   `${fromQuery} ${toQuery} ${notificationQuery}`
    // );
    return result;
  } catch (error) {
    console.log(error.message);
    return `Error`;
  }
};

const getDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString();
};

const updateNotification = async (bodyData) => {
  const getUsersRoleQuery = `SELECT * FROM AdminUsersApp`;
  const usersDataResult = await getData(getUsersRoleQuery);
  // await sql.connect(config);
  // const usersDataResult = await sql.query(getUsersRoleQuery);
  const usersData = usersDataResult.recordsets[0];
  let notificationQuery = "";
  usersData.forEach((user) => {
    const userRole = JSON.parse(user.UserRole);
    if (userRole.Admin) {
      notificationQuery += ` INSERT INTO AppNotification VALUES(
        GETDATE(), '${bodyData.UserName}',
        '${bodyData.ProfileImg}', '${user.UserName}', 
        '${bodyData.Category}', '${bodyData.Item}',
        '${bodyData.Code} Recieved To Store ${bodyData.ItemTo} From Store ${bodyData.ItemFrom}',
        'false', 'false'
      )`;
    } else {
      if (
        user.UserName !== bodyData.UserName &&
        (userRole?.Editor?.StocksList?.includes(bodyData.ItemFrom) ||
          userRole?.User?.StocksList?.includes(bodyData.ItemFrom))
      ) {
        notificationQuery += ` INSERT INTO AppNotification VALUES(
        GETDATE(), '${bodyData.UserName}',
        '${bodyData.ProfileImg}', '${user.UserName}', 
        '${bodyData.Category}', '${bodyData.Item}',
        '${bodyData.Code} Recieved To Store ${bodyData.ItemTo} From Store ${bodyData.ItemFrom}',
        'false', 'false'
      )`;
      } else {
        // console.log(`user: ${user.UserName} is Not Allowed`);
      }
    }
  });
  return notificationQuery;
};

module.exports = { updateStore };
