const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");
const { updateData } = require("../../../../services/mainService");
const {
  AdminUsersAppSchema,
} = require("../../../../schemas/AdminUsersApp/schema");

const setUserSite = async (req, res) => {
  try {
    const bodyData = req.body;
    let result = [];
    if (model["AdminUsersApp"]) {
      result = model["AdminUsersApp"].filter(
        (item) => item.UserName === bodyData.username
      );
    } else {
      const query = `SELECT TOP 1 * FROM AdminUsersApp WHERE
      UserName = '${bodyData.username}'`;
      result = (await getData(query)).recordsets[0];
    }

    const userRole = result[0]?.UserRole && JSON.parse(result[0]?.UserRole);
    const newUserRole = {
      Admin: userRole.Admin,
      Editor: userRole.Editor,
      User: { ...userRole.User, Sites: [bodyData?.site] },
      StockRes: userRole.StockRes,
    };
    await updateData(
      { UserRole: JSON.stringify(newUserRole) },
      result[0]?.ID,
      "AdminUsersApp",
      AdminUsersAppSchema
    );
    // const updateQuery = `Update AdminUsersApp SET
    //  UserRole = '${JSON.stringify(newUserRole)}' WHERE UserName = '${
    //   bodyData?.username
    // }'`;
    // const updateResult = await getData(updateQuery);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { setUserSite };
