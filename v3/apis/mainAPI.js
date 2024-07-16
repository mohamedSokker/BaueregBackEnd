const {
  getTables,
  getTableData,
  getAllData,
  getAllCons,
  getAllProd,
} = require("../services/mainService");
// const { migrateDate } = require("../controllers/web/Migration/handleAvCalc");
// const { createTables } = require("../controllers/web/Migration/createTables");

const { MaintenanceSchema } = require("../schemas/Maintenance/schema");
const { TestSchema } = require("../schemas/TestTable/schema");
const { AvailabilitySchema } = require("../schemas/Availability/schema");
const { Kelly_LocationSchema } = require("../schemas/Kelly_Location/schema");
const {
  Maintenance_StocksSchema,
} = require("../schemas/Maintenance_Stocks/schema");
const {
  Maintenance_StocksDemoSchema,
} = require("../schemas/Maintenance_StocksDemo/schema");
const { GearBoxesSchema } = require("../schemas/GearBoxes/schema");
const {
  Order_ConfirmationSchema,
} = require("../schemas/Order_Confirmation/schema");
const { Order_InvoiceSchema } = require("../schemas/Order_Invoice/schema");
const { Order_NumberSchema } = require("../schemas/Order_Number/schema");
const { Order_QuotationSchema } = require("../schemas/Order_Quotation/schema");
const {
  Availability_PlanSchema,
} = require("../schemas/Availability_Plan/schema");
const { Bauer_BreakdownSchema } = require("../schemas/Bauer_Breakdown/schema");
const { MachinarySchema } = require("../schemas/Machinary/schema");
const {
  Bauer_EquipmentsSchema,
} = require("../schemas/Bauer_Equipments/schema");
const {
  Bauer_Equipments_ModelSchema,
} = require("../schemas/Bauer_Equipments_Model/schema");
const {
  Machinary_LocationSchema,
} = require("../schemas/Machinary_Location/schema");
const { AppNotificationSchema } = require("../schemas/AppNotification/schema");
const {
  EquipmentsTransportSchema,
} = require("../schemas/EquipmentsTransport/schema");
const {
  Equipments_LocationSchema,
} = require("../schemas/Equipments_Location/schema");
const { Operating_HrsSchema } = require("../schemas/Operating_Hrs/schema");
const { Location_BauerSchema } = require("../schemas/Location_Bauer/schema");
const {
  TaskManagerReportsSchema,
} = require("../schemas/TaskManagerReports/schema");
const {
  TaskManagerTasksSchema,
} = require("../schemas/TaskManagerTasks/schema");
const {
  AppMaintNotificationSchema,
} = require("../schemas/AppMaintNotification/schema");
const {
  AppMaintMaintenanceSchema,
} = require("../schemas/AppMaintMaintenance/schema");
const { LoadIndicatorSchema } = require("../schemas/LoadIndicator/schema");
const {
  Recieved_InvoicesSchema,
} = require("../schemas/Recieved_Invoices/schema");
const {
  PeriodicMaintenance_PlanSchema,
} = require("../schemas/PeriodicMaintenance_Plan/schema");
const { EnginesSchema } = require("../schemas/Engines/schema");
const { GearBoxesTrenchSchema } = require("../schemas/GearBoxesTrench/schema");
const { MudPumpsSchema } = require("../schemas/MudPumps/schema");
const { AppMaintUsersSchema } = require("../schemas/AppMaintUsers/schema");
const { AdminUsersAppSchema } = require("../schemas/AdminUsersApp/schema");
const { QCTableSchema } = require("../schemas/QCTable/schema");
const { WorkShopsSchema } = require("../schemas/WorkShops/schema");
const { AppStocksSchema } = require("../schemas/AppStocks/schema");
const { AppPlaceOrderSchema } = require("../schemas/AppPlaceOrder/schema");
const {
  AppStocksTransitionSchema,
} = require("../schemas/AppStocksTransition/schema");
const { EqsToolsSchema } = require("../schemas/EqsTools/schema");
const {
  EqsToolsLocationSchema,
} = require("../schemas/EqsToolsLocation/schema");
const { OilSamplesSchema } = require("../schemas/OilSamples/schema");
const { ManageDataEntrySchema } = require("../schemas/ManageDataEntry/schema");

const route = require("../routes/mainRoute");
const { getAllTables } = require("../helpers/getTables");
const { regix } = require("../helpers/regix");

const tables = [
  { name: "Test", schema: TestSchema },
  { name: "Availability", schema: AvailabilitySchema },
  { name: "Maintenance", schema: MaintenanceSchema },
  { name: "Kelly_Location", schema: Kelly_LocationSchema },
  { name: "Maintenance_Stocks", schema: Maintenance_StocksSchema },
  // { name: "Maintenance_StocksDemo", schema: Maintenance_StocksDemoSchema },
  // { name: "GearBoxes", schema: GearBoxesSchema },
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
  { name: "Operating_Hrs", schema: Operating_HrsSchema },
  { name: "Location_Bauer", schema: Location_BauerSchema },
  { name: "TaskManagerReports", schema: TaskManagerReportsSchema },
  { name: "TaskManagerTasks", schema: TaskManagerTasksSchema },
  { name: "AppMaintNotification", schema: AppMaintNotificationSchema },
  { name: "AppMaintMaintenance", schema: AppMaintMaintenanceSchema },
  // { name: "LoadIndicator", schema: LoadIndicatorSchema },
  { name: "Recieved_Invoices", schema: Recieved_InvoicesSchema },
  // { name: "PeriodicMaintenance_Plan", schema: PeriodicMaintenance_PlanSchema },
  // { name: "Engines", schema: EnginesSchema },
  // { name: "GearBoxesTrench", schema: GearBoxesTrenchSchema },
  // { name: "MudPumps", schema: MudPumpsSchema },
  { name: "QCTable", schema: QCTableSchema },
  { name: "WorkShops", schema: WorkShopsSchema },
  { name: "AppStocks", schema: AppStocksSchema },
  { name: "AppStocksTransition", schema: AppStocksTransitionSchema },
  { name: "AppPlaceOrder", schema: AppPlaceOrderSchema },
  { name: "EqsTools", schema: EqsToolsSchema },
  { name: "EqsToolsLocation", schema: EqsToolsLocationSchema },
  { name: "OilSamples", schema: OilSamplesSchema },
  { name: "ManageDataEntry", schema: ManageDataEntrySchema },
];

const addVariables = (table, schema) => {
  return (req, res, next) => {
    req.table = table;
    req.schema = schema;
    next();
  };
};

const tablesV2EndPoint = async (app) => {
  try {
    tables.forEach(async (item) => {
      app.use(
        `/api/v3/${item.name}`,
        addVariables(item.name, item.schema),
        route
      );
      app.get(`/api/v3/${item.name}Schema`, async (req, res) => {
        try {
          return res.status(200).json(item.schema);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      });
      try {
        await getAllData(item.name);
      } catch (error) {
        console.log(error.message);
      }
    });

    await getAllData("AppMaintUsers");
    await getAllData("AdminUsersApp");
    await getAllCons();
    await getAllProd();
    await getTables();
    getAllData("ManageDataEntry").then(async (result) => {
      result?.map(async (item) => {
        let schemas = {};
        const fields = JSON.parse(item?.Fields);
        Object?.keys(fields)?.map((it) => {
          schemas = {
            ...schemas,
            [it]: { validatePattern: regix?.[fields?.[it]?.validateString] },
          };
        });
        console.log(schemas);
        // console.log(`Manage Data Entry Item => ${JSON.stringify(item)}`);
        if (item.Exist) {
          app.use(
            `/api/v3/${item.Name}`,
            addVariables(item.Name, schemas),
            route
          );
        }

        try {
          await getAllData(item.Name);
        } catch (error) {
          console.log(error.message);
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }

  app.use(
    "/api/v3/AppMaintUsers",
    addVariables("AppMaintUsers", AppMaintUsersSchema),
    route
  );
  app.use(
    "/api/v3/AdminUsersApp",
    addVariables("AdminUsersApp", AdminUsersAppSchema),
    route
  );

  app.get("/api/v3/AllTables", getAllTables);
  app.get("/api/v3/getTableData", async (req, res) => {
    try {
      console.log(req.query);
      const table = req.query.table;
      const data = await getTableData(table);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  // try {
  //   //   await getAllData("AppMaintUsers");
  //   //   await getAllData("AdminUsersApp");
  //   //   await getAllCons();
  //   //   await getAllProd();
  //   //   // await createTables("QCTable");
  //   setTimeout(() => {
  //     migrateDate();
  //   }, 30000);
  //   //   // setTimeout(() => {
  //   //   //   createTables();
  //   //   // }, 20000);
  // } catch (error) {
  //   console.log(error.message);
  // }
};

module.exports = { tablesV2EndPoint };
