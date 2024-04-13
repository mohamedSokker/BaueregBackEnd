const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllSite_Performance_piles = async (req, res) => {
  try {
    const result = await tableGetAll(`Site_Performance_piles`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSite_Performance_piles = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`Site_Performance_piles`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addSite_Performance_piles = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `Site_Performance_piles`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSite_Performance_piles = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `Site_Performance_piles`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSite_Performance_piles = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(
      `Site_Performance_piles`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSite_Performance_piles,
  getSite_Performance_piles,
  addSite_Performance_piles,
  updateSite_Performance_piles,
  deleteSite_Performance_piles,
};
