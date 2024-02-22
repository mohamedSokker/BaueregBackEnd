const databaseData = require("../routes/logic");
const { getAll, dropTable, createTable } = require("../controllers/logic");

const databaseDataEndPoints = (app) => {
  app.use("/databaseData", databaseData);
  app.get("/getAllData", getAll);
  app.post("/createTable", createTable);
  app.get("/dropTable", dropTable);
};

module.exports = { databaseDataEndPoints };
