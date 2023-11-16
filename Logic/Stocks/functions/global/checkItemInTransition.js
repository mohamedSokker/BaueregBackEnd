const { getData } = require("../../../../functions/getData");

const checkItemInTransition = async (bodyData) => {
  const query = `SELECT TOP 1 * FROM AppStocksTransition WHERE
    Code = '${bodyData.Code}' AND ItemFrom = '${bodyData.ItemFrom}'
    AND ItemTo = '${bodyData.ItemTo}' AND IsPending = 'true' ORDER BY ID DESC`;
  try {
    const result = await getData(query);
    // await sql.connect(config);
    // const result = await sql.query(query);
    if (result.rowsAffected[0] === 0)
      throw new Error(`no items found From this store send to you`);
    console.log(result.recordsets[0]);
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { checkItemInTransition };
