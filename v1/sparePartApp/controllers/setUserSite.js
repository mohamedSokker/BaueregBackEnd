const { getData } = require("../../../v3/helpers/getData");

const setUserSite = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `SELECT TOP 1 * FROM AdminUsersApp WHERE
      UserName = '${bodyData.username}'`;
    const result = (await getData(query)).recordsets[0];
    const userRole = result[0]?.UserRole && JSON.parse(result[0]?.UserRole);
    const newUserRole = {
      Admin: userRole.Admin,
      Editor: userRole.Editor,
      User: { ...userRole.User, Sites: [bodyData?.site] },
      StockRes: userRole.StockRes,
    };
    const updateQuery = `Update AdminUsersApp SET
     UserRole = '${JSON.stringify(newUserRole)}' WHERE UserName = '${
      bodyData?.username
    }'`;
    const updateResult = await getData(updateQuery);
    return res.status(200).json(updateResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { setUserSite };
