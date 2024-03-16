const { regix } = require("../regix");

const PeriodicMaintenance_PlanSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Year: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  TimeStart: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  TimeEnd: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  Duration: { databaseType: "INT", validatePattern: regix.int },
  PeriodicMaintenance_Interval: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  ExpectedOrActualNextDate: {
    databaseType: "DATETIME",
    validatePattern: regix.dateTime,
  },
  PerMaint_Details: { databaseType: "TEXT", validatePattern: regix.text },
  Type: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  MaintenanceID: { databaseType: "INT", validatePattern: regix.int },
};

module.exports = { PeriodicMaintenance_PlanSchema };
