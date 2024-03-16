const { getAllData } = require("./service");
// const Maintenance = require("./Maintenance/route");
// const Maintenance_Stocks = require("./Maintenance_Stocks/route");
// const Kelly_Location = require("./Kelly_Location/route");
// const Availability = require("./Availability/route");
// const Test = require("./TestTable/route");
const { MaintenanceSchema } = require("./Maintenance/schema");
const { TestSchema } = require("./TestTable/schema");
const { AvailabilitySchema } = require("./Availability/schema");
const { Kelly_LocationSchema } = require("./Kelly_Location/schema");
const { Maintenance_StocksSchema } = require("./Maintenance_Stocks/schema");
const { GearBoxesSchema } = require("./GearBoxes/schema");
const { Order_ConfirmationSchema } = require("./Order_Confirmation/schema");
const { Order_InvoiceSchema } = require("./Order_Invoice/schema");
const { Order_NumberSchema } = require("./Order_Number/schema");
const { Order_QuotationSchema } = require("./Order_Quotation/schema");
const { Availability_PlanSchema } = require("./Availability_Plan/schema");
const { Bauer_BreakdownSchema } = require("./Bauer_Breakdown/schema");
const { MachinarySchema } = require("./Machinary/schema");
const { Bauer_EquipmentsSchema } = require("./Bauer_Equipments/schema");
const {
  Bauer_Equipments_ModelSchema,
} = require("./Bauer_Equipments_Model/schema");
const { Machinary_LocationSchema } = require("./Machinary_Location/schema");
const { AppNotificationSchema } = require("./AppNotification/schema");
const { EquipmentsTransportSchema } = require("./EquipmentsTransport/schema");
const { Equipments_LocationSchema } = require("./Equipments_Location/schema");
const { Location_BauerSchema } = require("./Location_Bauer/schema");
const { TaskManagerReportsSchema } = require("./TaskManagerReports/schema");
const { TaskManagerTasksSchema } = require("./TaskManagerTasks/schema");
const { AppMaintNotificationSchema } = require("./AppMaintNotification/schema");
const { AppMaintMaintenanceSchema } = require("./AppMaintMaintenance/schema");
const { LoadIndicatorSchema } = require("./LoadIndicator/schema");
const { Recieved_InvoicesSchema } = require("./Recieved_Invoices/schema");
const {
  PeriodicMaintenance_PlanSchema,
} = require("./PeriodicMaintenance_Plan/schema");
const { EnginesSchema } = require("./Engines/schema");
const { GearBoxesTrenchSchema } = require("./GearBoxesTrench/schema");
const { MudPumpsSchema } = require("./MudPumps/schema");
const { AppMaintUsersSchema } = require("./AppMaintUsers/schema");

const route = require("./route");
const tables = [
  { name: "Test", schema: TestSchema },
  { name: "Availability", schema: AvailabilitySchema },
  { name: "Maintenance", schema: MaintenanceSchema },
  { name: "Kelly_Location", schema: Kelly_LocationSchema },
  { name: "Maintenance_Stocks", schema: Maintenance_StocksSchema },
  { name: "GearBoxes", schema: GearBoxesSchema },
  { name: "Order_Confirmation", schema: Order_ConfirmationSchema },
  { name: "Order_Invoice", schema: Order_InvoiceSchema },
  { name: "Order_Number", schema: Order_NumberSchema },
  { name: "Order_Quotation", schema: Order_QuotationSchema },
  { name: "Availability_Plan", schema: Availability_PlanSchema },
  { name: "Bauer_Breakdown", schema: Bauer_BreakdownSchema },
  { name: "Machinary", schema: MachinarySchema },
  { name: "Bauer_Equipments", schema: Bauer_EquipmentsSchema },
  { name: "Bauer_Equipments_Model", schema: Bauer_Equipments_ModelSchema },
  { name: "Machinary_Location", schema: Machinary_LocationSchema },
  { name: "AppNotification", schema: AppNotificationSchema },
  { name: "EquipmentsTransport", schema: EquipmentsTransportSchema },
  { name: "Equipments_Location", schema: Equipments_LocationSchema },
  { name: "Location_Bauer", schema: Location_BauerSchema },
  { name: "TaskManagerReports", schema: TaskManagerReportsSchema },
  { name: "TaskManagerTasks", schema: TaskManagerTasksSchema },
  { name: "AppMaintNotification", schema: AppMaintNotificationSchema },
  { name: "AppMaintMaintenance", schema: AppMaintMaintenanceSchema },
  { name: "LoadIndicator", schema: LoadIndicatorSchema },
  { name: "Recieved_Invoices", schema: Recieved_InvoicesSchema },
  { name: "PeriodicMaintenance_Plan", schema: PeriodicMaintenance_PlanSchema },
  { name: "Engines", schema: EnginesSchema },
  { name: "GearBoxesTrench", schema: GearBoxesTrenchSchema },
  { name: "MudPumps", schema: MudPumpsSchema },
];

const addVariables = (table, schema) => {
  return (req, res, next) => {
    req.table = table;
    req.schema = schema;
    next();
  };
};

const tablesV2EndPoint = (app) => {
  tables.forEach(async (item) => {
    app.use(
      `/api/v3/${item.name}`,
      addVariables(item.name, item.schema),
      route
    );
    await getAllData(item.name);
  });
  app.use(
    "/api/v3/AppMaintUsers",
    addVariables("AppMaintUsers", AppMaintUsersSchema),
    route
  );
  // app.use("/api/v3/Maintenance", Maintenance);
  // app.use("/api/v3/Maintenance_Stocks", Maintenance_Stocks);
  // app.use("/api/v3/Kelly_Location", Kelly_Location);
  // app.use("/api/v3/Availability", Availability);
  // app.use("/api/v3/Test", Test);
};

module.exports = { tablesV2EndPoint };
