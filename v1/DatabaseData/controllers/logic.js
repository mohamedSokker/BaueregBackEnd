const { getData } = require("../../../v3/helpers/getData");
const tableGetAll = require("../../Logic/tablesData/tableGetAll");

const logic = async (req, res) => {
  try {
    const query =
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";
    const data = await getData(query);
    return res.status(200).json(data.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTable = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `CREATE TABLE ${req?.query?.name} 
                   (${bodyData?.cols?.join(",")})`;
    console.log(query);
    const data = await getData(query);
    return res.status(200).json(data.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const dropTable = async (req, res) => {
  try {
    const query = `DROP TABLE ${req?.query?.name}`;
    const data = await getData(query);
    return res.status(200).json(data.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await tableGetAll(req.query.name, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic, getAll, createTable, dropTable };
