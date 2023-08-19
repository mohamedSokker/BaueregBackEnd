const sql = require("mssql");
const config = require("../../../../config");

const checkIteminStock = async (code, store) => {
  let query = `SELECT * FROM AppStocks WHERE Code = '${code}'
  AND Store = '${store}'`;
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    if (result.rowsAffected[0] === 0) return `no items found`;
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    return `Error`;
  }
};

module.exports = { checkIteminStock };
