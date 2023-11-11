const { getData } = require("../../functions/getData");

const getUsersToken = async (req, res) => {
  try {
    const bodyData = req.body;
    const getUsersRoleQuery = `SELECT * FROM AdminUsersApp`;
    const usersDataResult = await getData(getUsersRoleQuery);
    const usersData = usersDataResult.recordsets[0];

    let tokens = [];

    for (let i = 0; i < usersData.length; i++) {
      const userRole = JSON.parse(usersData[i].UserRole);
      if (userRole.Admin && usersData[i].UserName !== bodyData.UserName) {
        tokens.push(usersData[i]?.Token);
      } else {
        if (
          usersData[i].UserName !== bodyData.UserName &&
          (userRole?.Editor?.StocksList?.includes(bodyData.ItemFrom) ||
            userRole?.User?.StocksList?.includes(bodyData.ItemFrom) ||
            userRole?.Editor?.StocksList?.includes(bodyData.ItemTo) ||
            userRole?.User?.StocksList?.includes(bodyData.ItemTo))
        ) {
          tokens.push(usersData[i]?.Token);
        } else {
          console.log(`user: ${usersData[i].UserName} is Not Allowed`);
        }
      }
    }
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsersToken };
