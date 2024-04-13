const transportGetActiveSites = require("../../Transportation/routes/logic");
const AddEquipmentTrans = require("../../Transportation/routes/AddEquipmentsTrans");
const deleteEqsTrans = require("../../Transportation/routes/DeleteEqsTrans");
const editEqsTrans = require("../../Transportation/routes/EditEqsTrans");

const transportationsEndPoints = (app) => {
  app.use("/api/v1/transportGetActiveSites", transportGetActiveSites);
  app.use("/api/v1/addEquipmentTrans", AddEquipmentTrans);
  app.use("/api/v1/deleteEqsTrans", deleteEqsTrans);
  app.use("/api/v1/editEqsTrans", editEqsTrans);
};

module.exports = { transportationsEndPoints };
