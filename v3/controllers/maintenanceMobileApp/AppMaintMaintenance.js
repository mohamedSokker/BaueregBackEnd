// const tableInsertData = require("../../Logic/tablesData/tableInsertData");
// const tableUpdateData = require("../../Logic/tablesData/tableUpdateData");
// const tableDeleteData = require("../../Logic/tablesData/tableDeleteData");
// const tableGetAll = require("../../Logic/tablesData/tableGetAll");
// const tableGetSingle = require("../../Logic/tablesData/tableGetSingle");
const {
  getAllData,
  getOneData,
  addData,
  updateData,
  deleteData,
} = require("../../services/mainService");
const {
  AppMaintMaintenanceSchema,
} = require("../../schemas/AppMaintMaintenance/schema");

const getAllAppMaintMaintenance = async (req, res) => {
  try {
    const result = await getAllData("AppMaintMaintenance");
    // const result = await tableGetAll(`AppMaintMaintenance`, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppMaintMaintenance = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await getOneData(cond, "AppMaintMaintenance");
    // const result = await tableGetSingle(`AppMaintMaintenance`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAppMaintMaintenance = async (req, res) => {
  try {
    const result = await addData(
      req.body,
      "AppMaintMaintenance",
      AppMaintMaintenanceSchema
    );
    // const result = await tableInsertData(req.body, `AppMaintMaintenance`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAppMaintMaintenance = async (req, res) => {
  try {
    // const targetColVal = Object.values(req.params)[0];
    const targetColVal = req.params.id;
    const result = await updateData(
      req.body,
      targetColVal,
      "AppMaintMaintenance",
      AppMaintMaintenanceSchema
    );
    // const result = await tableUpdateData(
    //   req.body,
    //   `AppMaintMaintenance`,
    //   targetColVal
    // );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAppMaintMaintenance = async (req, res) => {
  try {
    // const targetColVal = Object.values(req.params)[0];
    const targetColVal = req.params.id;
    const result = await deleteData(targetColVal, "AppMaintMaintenance");
    // const result = await tableDeleteData(`AppMaintMaintenance`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAppMaintMaintenance,
  getAppMaintMaintenance,
  addAppMaintMaintenance,
  updateAppMaintMaintenance,
  deleteAppMaintMaintenance,
};
