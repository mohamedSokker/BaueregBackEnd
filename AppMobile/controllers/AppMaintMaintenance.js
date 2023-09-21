const tableInsertData = require("../../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../../Logic/tablesData/tableGetSingle");

const getAllAppMaintMaintenance = async (req, res) => {
  try {
    const result = await tableGetAll(`AppMaintMaintenance`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppMaintMaintenance = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`AppMaintMaintenance`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAppMaintMaintenance = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `AppMaintMaintenance`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAppMaintMaintenance = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `AppMaintMaintenance`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAppMaintMaintenance = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`AppMaintMaintenance`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAppMaintMaintenance,
  getAppMaintMaintenance,
  addAppMaintMaintenance,
  updateAppMaintMaintenance,
  deleteAppMaintMaintenance,
};
