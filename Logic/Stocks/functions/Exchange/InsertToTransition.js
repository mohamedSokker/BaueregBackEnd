const sql = require("mssql");
const config = require("../../../../config");

const insertToTransition = async (bodyData) => {
  const transQuery = `INSERT INTO AppStocksTransition VALUES(
    GETDATE(),
  '${bodyData.Code}','${bodyData.SabCode}', '${bodyData.Description}', 
  '${bodyData.ItemFrom}','${bodyData.ItemTo}', '${bodyData.ItemStatus}',
   '')`;

  const fromQuery = `UPDATE AppStocks SET Quantity = 
  '${Number(bodyData.Quantity) - 1}'
   WHERE ID = '${bodyData.ID}'`;

  const notificationQuery = await updateNotification(bodyData);

  // const updateStore = await calcUpdateStore(bodyData);
  const query = `${transQuery} ${fromQuery} ${notificationQuery}`;

  try {
    await sql.connect(config);
    const result = await sql.query(query);
    if (result.rowsAffected[0] === 0) return `no items found`;
    return result;
  } catch (error) {
    console.log(error.message);
    return "Error";
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
        '${bodyData.Code} Spend For Equipment ${bodyData.ItemTo}',
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
        '${bodyData.Code} Spend For Equipment ${bodyData.ItemTo}',
        'false', 'false'
      )`;
      } else {
        console.log(`user: ${user.UserName} is Not Allowed`);
      }
    }
  });
  return notificationQuery;
};

module.exports = { insertToTransition };
