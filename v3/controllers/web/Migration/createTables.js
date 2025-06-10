const { createTable } = require("../../../services/mainService");

// const {
//   Availability_PlanSchema,
// } = require("../../../schemas/Availability_Plan/schema");
// const { AvailabilitySchema } = require("../../../schemas/Availability/schema");
// const { MaintenanceSchema } = require("../../../schemas/Maintenance/schema");
// const {
//   Maintenance_StocksSchema,
// } = require("../../../schemas/Maintenance_Stocks/schema");
const { QCTableSchema } = require("../../../schemas/QCTable/schema");

const tables = [
  // { name: "Availability_Plan", schema: Availability_PlanSchema },
  // { name: "Availability", schema: AvailabilitySchema },
  // { name: "Maintenance", schema: MaintenanceSchema },
  // { name: "Maintenance_Stocks", schema: Maintenance_StocksSchema },
  { name: "QCTable", schema: QCTableSchema },
];

const createTables = async () => {
  try {
    for (let i = 0; i < tables.length; i++) {
      await createTable(tables[i].name, tables[i].schema);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createTables };

// createTables();
