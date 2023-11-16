const { getData } = require("../../../../functions/getData");

const getArrayValues = async (array) => {
  let result = undefined;
  if (array) {
    result = array.map((data) => data.name);
  }

  return result;
};

const getUsersToken = async (bodyData) => {
  const getUsersRoleQuery = `SELECT * FROM AdminUsersApp`;
  const usersDataResult = await getData(getUsersRoleQuery);
  const usersData = usersDataResult.recordsets[0];

  let tokens = [];
  let notificationQuery = ``;

  for (let i = 0; i < usersData.length; i++) {
    const userRole = JSON.parse(usersData[i].UserRole);
    const editorStocksList = await getArrayValues(userRole?.Editor?.StocksList);
    const usersStocksList = await getArrayValues(userRole?.User?.StocksList);
    if (
      (userRole.Admin && usersData[i].UserName !== bodyData.UserName) ||
      (usersData[i].UserName !== bodyData.UserName &&
        (editorStocksList?.includes(bodyData.ItemFrom) ||
          usersStocksList?.includes(bodyData.ItemFrom) ||
          editorStocksList?.includes(bodyData.ItemTo) ||
          usersStocksList?.includes(bodyData.ItemTo)))
    ) {
      if (
        usersData[i]?.Token !== "null" &&
        usersData[i]?.Token !== null &&
        usersData[i]?.Token !== ""
      ) {
        tokens.push(usersData[i]?.Token);
        notificationQuery += ` INSERT INTO AppNotification VALUES(
        GETDATE(), '${bodyData.UserName}',
        '${bodyData.ProfileImg}', '${usersData[i].UserName}', 
        '${bodyData.Category}', '${bodyData.title}',
        '${bodyData.body}',
        'false', 'false'
      )`;
      }
    }
  }
  console.log(tokens);
  return { tokens, notificationQuery };
};

module.exports = { getUsersToken };