const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllBauer_Equipments_Model = async (req, res) => {
  try {
    const result = await tableGetAll(`Bauer_Equipments_Model`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBauer_Equipments_Model = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Bauer_Equipments_Model`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addBauer_Equipments_Model = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Bauer_Equipments_Model`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBauer_Equipments_Model = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Bauer_Equipments_Model`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBauer_Equipments_Model = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(
      `Bauer_Equipments_Model`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBauer_Equipments_Model,
  getBauer_Equipments_Model,
  addBauer_Equipments_Model,
  updateBauer_Equipments_Model,
  deleteBauer_Equipments_Model,
};
