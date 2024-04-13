const { getData } = require("../../../v3/helpers/getData");

const tableDeleteData = async (tableName, targetColVal) => {
  const query = `DELETE FROM ${tableName} WHERE ID = '${targetColVal}'`;
  try {
    const result = await getData(query);
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = tableDeleteData;
