const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllWeek_Site_Plan = async (req, res) => {
  try {
    const result = await tableGetAll(`Week_Site_Plan`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWeek_Site_Plan = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Week_Site_Plan`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addWeek_Site_Plan = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Week_Site_Plan`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateWeek_Site_Plan = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Week_Site_Plan`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWeek_Site_Plan = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`Week_Site_Plan`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWeek_Site_Plan,
  getWeek_Site_Plan,
  addWeek_Site_Plan,
  updateWeek_Site_Plan,
  deleteWeek_Site_Plan,
};
