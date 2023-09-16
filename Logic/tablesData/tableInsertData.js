const { getData } = require("../../functions/getData");

const tableInsertData = async (fieldsData, tableName) => {
  const getquery = `SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('${tableName}')`;
  let Results = [];
  try {
    Results = await getData(getquery);
    Results = Results.recordsets[0];
    let keysStatus = true;
    let query = `INSERT INTO ${tableName} Values( `;
    const keys = Object.keys(fieldsData);
    for (let i = 0; i < Results.length; i++) {
      if (keys.includes(Results[i]["name"])) {
        if (fieldsData[Results[i]["name"]] === null) {
          query += null + ",";
        } else {
          query += "'" + fieldsData[Results[i]["name"]] + "',";
        }
      } else if (Results[i]["name"] == "ID") {
        query = query;
      } else {
        keysStatus = false;
        break;
      }
    }
    query = query.slice(0, -1);
    query += ")";
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

module.exports = tableInsertData;
