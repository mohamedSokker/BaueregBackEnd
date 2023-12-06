const { getData } = require("../../../../functions/getData");

const checkItemInStore = async (Code) => {
  const query = `SELECT TOP 1 * FROM AppStocks WHERE
    Code = '${Code}'`;
  try {
    const result = await getData(query);
    // await sql.connect(config);
    // const result = await sql.query(query);
    if (result.rowsAffected[0] === 0)
      throw new Error(`${Code} not found in store`);
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { checkItemInStore };
