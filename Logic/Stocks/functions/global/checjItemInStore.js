const { getData } = require("../../../../functions/getData");

const checkItemInStore = async (Code) => {
  const query = `SELECT TOP 1 * FROM AppStocks WHERE
    Code = '${Code}'`;
  try {
    const result = await getData(query);
    // await sql.connect(config);
    // const result = await sql.query(query);
    if (result.rowsAffected[0] === 0) return `no items found`;
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    return `Error`;
  }
};

module.exports = { checkItemInStore };
