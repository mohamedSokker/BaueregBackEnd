const { getData } = require("../../functions/getData");

const tableUpdateData = async (fieldsData, tableName, targetColVal) => {
  const getquery = `SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('${tableName}')`;
  let Results = [];
  let cond = "";
  try {
    Results = await getData(getquery);
    Results = Results.recordsets[0];
    let keysStatus = true;
    var query = `UPDATE ${tableName} SET `;
    const keys = Object.keys(fieldsData);
    for (let i = 0; i < Results.length; i++) {
      if (fieldsData[Results[i]["name"]] === null) {
        query += `${Results[i]["name"]} = NULL ,`;
      } else if (Results[i]["name"] == "ID") {
        cond = " WHERE ID = '" + targetColVal + "'";
      } else if (keys.includes(Results[i]["name"])) {
        query +=
          Results[i]["name"] + " ='" + fieldsData[Results[i]["name"]] + "',";
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
