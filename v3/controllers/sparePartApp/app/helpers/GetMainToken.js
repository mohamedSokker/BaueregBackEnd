const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getMainToken = async (req, res) => {
  try {
    let usersData = [];
    if (model["AdminUsersApp"]) {
      usersData = model["AdminUsersApp"];
    } else {
      const query = `SELECT * FROM AdminUsersApp`;
      usersData = (await getData(query)).recordsets[0];
    }

    let tokens = [];

    for (let i = 0; i < usersData.length; i++) {
      const userRole = JSON.parse(usersData[i].UserRole);
      if (userRole.StockRes && userRole.StockRes[0] === "Main") {
        if (
          usersData[i]?.Token !== "null" &&
          usersData[i]?.Token !== null &&
          usersData[i]?.Token !== ""
        )
          tokens.push(usersData[i]?.Token);
      }
    }
    console.log(tokens);
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getMainToken };
