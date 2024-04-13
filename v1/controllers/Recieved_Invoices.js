const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllRecieved_Invoices = async (req, res) => {
  try {
    const result = await tableGetAll(`Recieved_Invoices`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRecieved_Invoices = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Recieved_Invoices`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addRecieved_Invoices = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Recieved_Invoices`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRecieved_Invoices = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Recieved_Invoices`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRecieved_Invoices = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Recieved_Invoices`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRecieved_Invoices,
  getRecieved_Invoices,
  addRecieved_Invoices,
  updateRecieved_Invoices,
  deleteRecieved_Invoices,
};
