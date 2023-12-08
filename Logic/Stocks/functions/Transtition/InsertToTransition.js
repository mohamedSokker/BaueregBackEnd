const { getData } = require("../../../../functions/getData");

const insertToTransition = async (bodyData) => {
  const transQuery = `INSERT INTO AppStocksTransition VALUES(
    GETDATE(),
  '${bodyData.Code}','${bodyData.SabCode}', '${bodyData.Description}', 
  '${bodyData.ItemFrom}','${bodyData.ItemTo}', '${bodyData.ItemStatus}',
   'true')`;

  const fromQuery = `UPDATE AppStocks SET Quantity = 
  '${Number(bodyData.Quantity) - Number(bodyData.q)}'
   WHERE ID = '${bodyData.ID}'`;

  // const notificationQuery = await updateNotification(bodyData);

  const query = `${transQuery} ${fromQuery} `;

  console.log(query);

  try {
    // const result = await getData(query);
    return query;
  } catch (error) {
    throw new Error(error.message);
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
        '${bodyData.Code} is going to ${bodyData.ItemTo} from ${bodyData.ItemFrom}',
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
        '${bodyData.Code} is going to ${bodyData.ItemTo} from ${bodyData.ItemFrom}',
        'false', 'false'
      )`;
      } else {
        // console.log(`user: ${user.UserName} is Not Allowed`);
      }
    }
  });
  return notificationQuery;
};

// const calcUpdateStore = async (bodyData) => {
//   const fromQuery = `UPDATE AppStocks SET Quantity =
//   '${Number(bodyData.Quantity) - 1}'
//    WHERE ID = '${bodyData.ID}'`;
//   const searchQuery = `SELECT TOP 1 * FROM AppStocks WHERE Code = '${bodyData.Code}'
//   AND Store = '${bodyData.ItemTo}'`;
//   try {
//     await sql.connect(config);
//     const searchResult = await sql.query(searchQuery);
//     let toQuery = ``;
//     if (searchResult.rowsAffected[0] === 0) {
//       toQuery = `INSERT INTO AppStocks VALUES ('${bodyData.Code}',
//       '${bodyData.SabCode}', '${bodyData.Unit}', '1',
//       '${bodyData.ItemTo}', '${bodyData.Description}', '${bodyData.Detail}')`;
//     } else {
//       toQuery = `UPDATE AppStocks SET Quantity =
//       '${Number(searchResult.recordsets[0][0][`Quantity`]) + 1}'
//       WHERE ID = '${searchResult.recordsets[0][0][`ID`]}'`;
//     }
//     return `${fromQuery} ${toQuery}`;
//   } catch (error) {
//     console.log(error.message);
//     return `Error`;
//   }
// };

module.exports = { insertToTransition };
