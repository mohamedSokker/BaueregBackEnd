const { getData } = require("../../functions/getData");

const getMainToken = async (req, res) => {
  try {
    const bodyData = req.body;
    const getUsersRoleQuery = `SELECT * FROM AdminUsersApp`;
    const usersDataResult = await getData(getUsersRoleQuery);
    const usersData = usersDataResult.recordsets[0];

    let tokens = [];

    for (let i = 0; i < usersData.length; i++) {
      const userRole = JSON.parse(usersData[i].UserRole);
      if (userRole.StockRes && userRole.StockRes[0] === "Main") {
        tokens.push(usersData[i]?.Token);
      }
    }
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getMainToken };
