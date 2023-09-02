const { getData } = require("../../functions/getData");

const tableGetSingle = async (tableName, condition) => {
  const cond = condition;
  const query = `SELECT * FROM ${tableName} WHERE ID = '${cond}'`;
  try {
    const result = await getData(query);
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = tableGetSingle;
