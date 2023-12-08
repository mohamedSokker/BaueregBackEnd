const { getData } = require("../../../../functions/getData");

const updateStore = async (bodyData) => {
  const diff = Number(bodyData.TransQuantity) - Number(bodyData.q);
  const fromQuery =
    diff === 0
      ? `UPDATE AppStocksTransition SET 
  Quantity = '${diff}',
  IsPending = 'false' WHERE
  ID = '${bodyData.TransID}'`
      : `UPDATE AppStocksTransition SET 
  Quantity = '${diff}',
  IsPending = 'true' WHERE
  ID = '${bodyData.TransID}'`;
  try {
    let toQuery = ``;
    if (bodyData.Status === `New`) {
      toQuery = `INSERT INTO AppStocks VALUES ('${bodyData.Code}',
      '${bodyData.SabCode}', '${bodyData.Unit}', '${Number(bodyData.q)}',
      '${bodyData.ItemTo}', '${bodyData.Description}', 
      '${bodyData.Detail}', '${bodyData.Position}')`;
    } else {
      toQuery = `UPDATE AppStocks SET Quantity = 
      '${Number(bodyData.q) + Number(bodyData.Quantity)}' 
      WHERE ID = '${bodyData?.ID}'`;
    }
    console.log(`${fromQuery} ${toQuery}`);
    return `${fromQuery} ${toQuery} `;
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
