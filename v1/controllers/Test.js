const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const { getData } = require("../../v3/helpers/getData");

const getAllTest = async (req, res) => {
  try {
    const result = await tableGetAll(`Test`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTest = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Test`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addTest = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Test`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTest = async (req, res) => {
  // try {
  //   const targetColVal = Object.values(req.params)[0];
  //   const result = await tableUpdateData(req.body, `Test`, targetColVal);
  //   return res.status(200).json({ success: "true", dataUpdated: result });
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
  const getquery =
    "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('Test')";
  let Results = [];
  let cond = " WHERE ID = '" + Object.values(req.params)[0] + "'";
  try {
    Results = await getData(getquery);
    Results = Results.recordsets[0];
    let arrayResult = [];
    Results.map((result) => {
      arrayResult.push(result.name);
      return arrayResult;
    });
    let keysStatus = true;
    var query = "UPDATE Test SET ";
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys.length; i++) {
      if (arrayResult.includes(keys[i]) && keys[i] !== "ID") {
        query += keys[i] + " ='" + req.body[keys[i]] + "',";
      } else {
        keysStatus = false;
        res.status(404).send("Wrong Arguments");
        break;
      }
    }
    query = query.slice(0, -1);
    query += cond;
    console.log(query);
    if (keysStatus === true) {
      const result = await getData(query);
      return res.status(200).json({ success: "true", dataUpdated: result });
    } else {
      return res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTest = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Test`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTest,
  getTest,
  addTest,
  updateTest,
  deleteTest,
};
