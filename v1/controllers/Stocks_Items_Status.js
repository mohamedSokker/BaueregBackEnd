const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllStocks_Items_Status = async (req, res) => {
  try {
    const result = await tableGetAll(`Stocks_Items_Status`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStocks_Items_Status = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Stocks_Items_Status`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addStocks_Items_Status = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Stocks_Items_Status`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStocks_Items_Status = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Stocks_Items_Status`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteStocks_Items_Status = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Stocks_Items_Status`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStocks_Items_Status,
  getStocks_Items_Status,
  addStocks_Items_Status,
  updateStocks_Items_Status,
  deleteStocks_Items_Status,
};
