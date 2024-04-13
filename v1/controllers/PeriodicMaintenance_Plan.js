const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllPeriodicMaintenance_Plan = async (req, res) => {
  try {
    const result = await tableGetAll(`PeriodicMaintenance_Plan`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPeriodicMaintenance_Plan = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`PeriodicMaintenance_Plan`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addPeriodicMaintenance_Plan = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `PeriodicMaintenance_Plan`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePeriodicMaintenance_Plan = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `PeriodicMaintenance_Plan`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePeriodicMaintenance_Plan = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(
      `PeriodicMaintenance_Plan`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPeriodicMaintenance_Plan,
  getPeriodicMaintenance_Plan,
  addPeriodicMaintenance_Plan,
  updatePeriodicMaintenance_Plan,
  deletePeriodicMaintenance_Plan,
};
