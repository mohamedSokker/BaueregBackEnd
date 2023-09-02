const { getData } = require("../../functions/getData");
const { parseURL } = require("../../functions/parseURL");

const getAllData = async (tableName, reqquery) => {
  let query = "";
  const { cond, limit, fullquery, page } = reqquery;
  if (limit) {
    query = `SELECT TOP " + limit + " * FROM ${tableName}`;
  } else {
    query = `SELECT * FROM ${tableName}`;
  }
  if (page && limit) {
    let startCount = (Number(page) - 1) * Number(limit) + 1;
    let endCount = Number(startCount) + Number(limit) - 1;
    query = `WITH RowNo AS (SELECT ROW_NUMBER() OVER (ORDER BY ID) AS rowno, 
            * FROM ${tableName}) SELECT * FROM RowNo WHERE RowNo BETWEEN ${startCount} AND  ${endCount}`;
    parseURL(query);
  }
  if (cond) {
    query = query + " WHERE " + cond;
    parseURL(query);
  } else if (fullquery) {
    query = fullquery;
    parseURL(query);
  }

  try {
    const result = await getData(query);
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllData;
