const { getData } = require("../../../../functions/getData");

const checkIteminStock = async (code) => {
  const query = `SELECT * FROM AppStocks WHERE Code = '${code}'`;
  try {
    const result = await getData(query);
    // await sql.connect(config);
    // const result = await sql.query(query);
    // if (result.rowsAffected[0] === 0)
    //   throw new Error(`no items found in Stock`);
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { checkIteminStock };
