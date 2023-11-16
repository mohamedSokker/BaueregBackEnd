const { getData } = require("../../../../functions/getData");

const getMainTokens = async () => {
  const getUsersRoleQuery = `SELECT * FROM AdminUsersApp`;
  const usersDataResult = await getData(getUsersRoleQuery);
  const usersData = usersDataResult.recordsets[0];

  let tokens = [];

  for (let i = 0; i < usersData.length; i++) {
    const userRole = JSON.parse(usersData[i].UserRole);
    if (userRole.StockRes && userRole.StockRes[0] === "Main") {
      if (usersData[i]?.Token !== "null" && usersData[i]?.Token !== null)
        tokens.push(usersData[i]?.Token);
    }
  }
  console.log(tokens);
  return tokens;
};

module.exports = { getMainTokens };
