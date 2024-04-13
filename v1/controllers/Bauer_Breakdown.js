const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllBauer_Breakdown = async (req, res) => {
  try {
    const result = await tableGetAll(`Bauer_Breakdown`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBauer_Breakdown = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Bauer_Breakdown`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addBauer_Breakdown = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Bauer_Breakdown`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBauer_Breakdown = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Bauer_Breakdown`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBauer_Breakdown = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Bauer_Breakdown`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBauer_Breakdown,
  getBauer_Breakdown,
  addBauer_Breakdown,
  updateBauer_Breakdown,
  deleteBauer_Breakdown,
};
