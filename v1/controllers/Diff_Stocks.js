const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllDiff_Stocks = async (req, res) => {
  try {
    const result = await tableGetAll(`Diff_Stocks`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDiff_Stocks = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Diff_Stocks`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addDiff_Stocks = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Diff_Stocks`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateDiff_Stocks = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(req.body, `Diff_Stocks`, targetColVal);
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteDiff_Stocks = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Diff_Stocks`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDiff_Stocks,
  getDiff_Stocks,
  addDiff_Stocks,
  updateDiff_Stocks,
  deleteDiff_Stocks,
};
