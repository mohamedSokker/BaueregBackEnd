const sql = require("mssql");
const config = require("../../../../config");

const updateStore = async (bodyData) => {
  const fromQuery = `INSERT INTO AppStocksTransition VALUES(
    GETDATE(),
  '${bodyData.Code}','${bodyData.SabCode}', '${bodyData.Description}', 
  '','${bodyData.ItemTo}', '${bodyData.ItemStatus}',
   '')`;
  const searchQuery = `SELECT TOP 1 * FROM AppStocks WHERE Code = '${bodyData.Code}'
  AND Store = '${bodyData.ItemTo}'`;
  try {
    await sql.connect(config);
    const searchResult = await sql.query(searchQuery);
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

    await sql.connect(config);
    const result = await sql.query(
      `${fromQuery} ${toQuery} ${notificationQuery}`
    );
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
  await sql.connect(config);
  const usersDataResult = await sql.query(getUsersRoleQuery);
  const usersData = usersDataResult.recordsets[0];
  let notificationQuery = "";
  usersData.forEach((user) => {
    const userRole = JSON.parse(user.UserRole);
    if (userRole.Admin) {
      notificationQuery += ` INSERT INTO AppNotification VALUES(
        GETDATE(), '${bodyData.UserName}',
        '${bodyData.ProfileImg}', '${user.UserName}', 
        '${bodyData.Category}', '${bodyData.Item}',
        '${bodyData.Code} Added To Store ${bodyData.ItemTo}',
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
        '${bodyData.Code} Added To Store ${bodyData.ItemTo}',
        'false', 'false'
      )`;
      } else {
        console.log(`user: ${user.UserName} is Not Allowed`);
      }
    }
    console.log(notificationQuery);
  });
  return notificationQuery;
};

module.exports = { updateStore };
