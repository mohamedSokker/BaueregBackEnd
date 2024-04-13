const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllMachinary_Location = async (req, res) => {
  try {
    const result = await tableGetAll(`Machinary_Location`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMachinary_Location = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Machinary_Location`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addMachinary_Location = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Machinary_Location`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMachinary_Location = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Machinary_Location`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMachinary_Location = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Machinary_Location`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMachinary_Location,
  getMachinary_Location,
  addMachinary_Location,
  updateMachinary_Location,
  deleteMachinary_Location,
};
