const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getArrayValues = async (array) => {
  let result = undefined;
  if (array) {
    result = array.map((data) => data.name);
  }

  return result;
};

const getUsersToken = async (bodyData) => {
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
      }
    }
  }
  return tokens;
};

module.exports = { getUsersToken };
