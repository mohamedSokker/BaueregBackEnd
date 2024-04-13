const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllOrder_Number = async (req, res) => {
  try {
    const result = await tableGetAll(`Order_Number`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrder_Number = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Order_Number`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addOrder_Number = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Order_Number`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrder_Number = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Order_Number`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrder_Number = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Order_Number`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrder_Number,
  getOrder_Number,
  addOrder_Number,
  updateOrder_Number,
  deleteOrder_Number,
};
