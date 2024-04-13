const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllBG250 = async (req, res) => {
  try {
    const result = await tableGetAll(`BG250`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBG250 = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`BG250`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addBG250 = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `BG250`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBG250 = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(req.body, `BG250`, targetColVal);
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBG250 = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`BG250`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBG250,
  getBG250,
  addBG250,
  updateBG250,
  deleteBG250,
};
