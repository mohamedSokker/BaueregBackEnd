const { regix } = require("../../helpers/regix");

const MaintenanceSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Date_Time: {
    databaseType: "DATE",
    validatePattern: regix.date,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Equipment_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Equipment_Model: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Working_Hours: { databaseType: "INT", validatePattern: regix.int },
  Breakdown_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Problem: {
    databaseType: "TEXT",
    validatePattern: regix.text,
  },
  Action: { databaseType: "TEXT", validatePattern: regix.text },
  Problem_start_From: {
    databaseType: "DATETIME",
    validatePattern: regix.dateTime,
  },
  Problem_End_To: {
    databaseType: "DATETIME",
    validatePattern: regix.dateTime,
  },
  Breakdown_time: {
    databaseType: "DECIMAL(8,1)",
    validatePattern: regix.decimal81,
  },
  Site_QC_Min: {
    databaseType: "DECIMAL(8,1)",
    validatePattern: regix.decimal81,
  },
  Spare_part: {
    databaseType: "TEXT",
    validatePattern: regix.maintSparePart,
  },
};

module.exports = { MaintenanceSchema };
