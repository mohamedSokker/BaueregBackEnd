const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllMaintenance_Stocks = async (req, res) => {
  try {
    const result = await tableGetAll(`Maintenance_Stocks`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMaintenance_Stocks = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Maintenance_Stocks`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addMaintenance_Stocks = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Maintenance_Stocks`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMaintenance_Stocks = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Maintenance_Stocks`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMaintenance_Stocks = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Maintenance_Stocks`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMaintenance_Stocks,
  getMaintenance_Stocks,
  addMaintenance_Stocks,
  updateMaintenance_Stocks,
  deleteMaintenance_Stocks,
};
