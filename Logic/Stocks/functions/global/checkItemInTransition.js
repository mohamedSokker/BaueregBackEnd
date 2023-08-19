const sql = require("mssql");
const config = require("../../../../config");

const checkItemInTransition = async (bodyData) => {
  const query = `SELECT TOP 1 * FROM AppStocksTransition WHERE
    Code = '${bodyData.Code}' AND ItemFrom = '${bodyData.ItemFrom}'
    AND ItemTo = '${bodyData.ItemTo}' AND IsPending = 'true'`;
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

module.exports = { checkItemInTransition };
