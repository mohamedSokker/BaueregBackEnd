const { getData } = require("../../../../../v3/helpers/getData");

const updateStore = async (bodyData) => {
  const fromQuery = `INSERT INTO AppStocksTransition VALUES(
    GETDATE(),
  '${bodyData.Code}','${bodyData.SabCode}', '${bodyData.Description}',
  '${bodyData.q}', 
  '${bodyData.ItemFrom}', '${bodyData.catData}', '${bodyData.ItemTo}', '', 
  '${bodyData.ItemStatus}', '')`;
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

    // const notificationQuery = await updateNotification(bodyData);

    // const result = await getData(
    //   `${fromQuery} ${toQuery} ${notificationQuery}`
    // );
    // await sql.connect(config);
    // const result = await sql.query(
    //   `${fromQuery} ${toQuery} ${notificationQuery}`
    // );
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
        // console.log(`user: ${user.UserName} is Not Allowed`);
      }
    }
  });
  return notificationQuery;
};

module.exports = { updateStore };
