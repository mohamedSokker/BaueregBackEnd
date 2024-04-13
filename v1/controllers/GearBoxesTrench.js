const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllGearBoxesTrench = async (req, res) => {
  try {
    const result = await tableGetAll(`GearBoxesTrench`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getGearBoxesTrench = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`GearBoxesTrench`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addGearBoxesTrench = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `GearBoxesTrench`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateGearBoxesTrench = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `GearBoxesTrench`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteGearBoxesTrench = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`GearBoxesTrench`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGearBoxesTrench,
  getGearBoxesTrench,
  addGearBoxesTrench,
  updateGearBoxesTrench,
  deleteGearBoxesTrench,
};
