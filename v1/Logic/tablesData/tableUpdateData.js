const { getData } = require("../../../v3/helpers/getData");
const bcrypt = require("bcrypt");

const tableUpdateData = async (fieldsData, tableName, targetColVal) => {
  const getquery = `SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('${tableName}')`;
  let Results = [];
  let cond = "WHERE ID = '" + targetColVal + "'";
  try {
    Results = await getData(getquery);
    Results = Results.recordsets[0];
    let arrayResult = [];
    Results.map((result) => {
      arrayResult.push(result.name);
      return arrayResult;
    });
    let keysStatus = true;
    var query = `UPDATE ${tableName} SET `;
    const keys = Object.keys(fieldsData);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "Password") {
        query += `${keys[i]} = '${await bcrypt.hash(
          fieldsData[keys[i]],
          10
        )}',`;
      } else if (fieldsData[keys[i]] === null) {
        query += `${keys[i]} = NULL ,`;
      } else if (keys[i] == "ID") {
        cond = " WHERE ID = '" + targetColVal + "'";
      } else if (arrayResult.includes(keys[i]) && keys[i] !== "ID") {
        query += keys[i] + " ='" + fieldsData[keys[i]] + "',";
      } else {
        keysStatus = false;
        break;
      }
    }
    query = query.slice(0, -1);
    query += cond;
    console.log(query);
    if (keysStatus === true) {
      const result = await getData(query);
      return result.recordsets[0];
    } else {
      throw new Error(`Missing Data`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = tableUpdateData;
