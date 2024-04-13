const tableInsertData = require("../Logic/tablesData/tableInsertData");
const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
const tableGetAll = require("../Logic/tablesData/tableGetAll");
const tableGetSingle = require("../Logic/tablesData/tableGetSingle");

const getAllTimeLine_Piles = async (req, res) => {
  try {
    const result = await tableGetAll(`TimeLine_Piles`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTimeLine_Piles = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await tableGetSingle(`TimeLine_Piles`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addTimeLine_Piles = async (req, res) => {
  try {
    const result = await tableInsertData(req.body, `TimeLine_Piles`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTimeLine_Piles = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableUpdateData(
      req.body,
      `TimeLine_Piles`,
      targetColVal
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTimeLine_Piles = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`TimeLine_Piles`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTimeLine_Piles,
  getTimeLine_Piles,
  addTimeLine_Piles,
  updateTimeLine_Piles,
  deleteTimeLine_Piles,
};
