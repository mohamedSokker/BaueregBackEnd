const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllEquipment_Performance_Piles = async (req, res) => {
  try {
    const result = await tableGetAll(`Equipment_Performance_Piles`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEquipment_Performance_Piles = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Equipment_Performance_Piles`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addEquipment_Performance_Piles = async (req, res) => {
  try {
    const result = await tableInsertData(
      req.body,
      `Equipment_Performance_Piles`
    );
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEquipment_Performance_Piles = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Equipment_Performance_Piles`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEquipment_Performance_Piles = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(
      `Equipment_Performance_Piles`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEquipment_Performance_Piles,
  getEquipment_Performance_Piles,
  addEquipment_Performance_Piles,
  updateEquipment_Performance_Piles,
  deleteEquipment_Performance_Piles,
};
