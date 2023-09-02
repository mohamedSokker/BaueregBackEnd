const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllDiff_Value_Stocks = async (req, res) => {
  try {
    const result = await tableGetAll(`Diff_Value_Stocks`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDiff_Value_Stocks = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Diff_Value_Stocks`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addDiff_Value_Stocks = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Diff_Value_Stocks`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateDiff_Value_Stocks = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Diff_Value_Stocks`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteDiff_Value_Stocks = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Diff_Value_Stocks`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDiff_Value_Stocks,
  getDiff_Value_Stocks,
  addDiff_Value_Stocks,
  updateDiff_Value_Stocks,
  deleteDiff_Value_Stocks,
};
