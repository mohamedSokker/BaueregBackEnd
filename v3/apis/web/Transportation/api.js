const transportGetActiveSites = require("../../../routes/web/Transportation/getActiveSites");
const transportGetEqTransp = require("../../../routes/web/Transportation/getEqTransp");
const AddEquipmentTrans = require("../../../routes/web/Transportation/AddEquipmentsTrans");
const deleteEqsTrans = require("../../../routes/web/Transportation/DeleteEqsTrans");
const editEqsTrans = require("../../../routes/web/Transportation/EditEqsTrans");

const transportationsEndPoints = (app) => {
  app.use("/api/v1/transportGetActiveSites", transportGetActiveSites);
  app.use("/api/v1/transportGetEqTransp", transportGetEqTransp);
  app.use("/api/v1/addEquipmentTrans", AddEquipmentTrans);
  app.use("/api/v1/deleteEqsTrans", deleteEqsTrans);
  app.use("/api/v1/editEqsTrans", editEqsTrans);
};

module.exports = { transportationsEndPoints };
