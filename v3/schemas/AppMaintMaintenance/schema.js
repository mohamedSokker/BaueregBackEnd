const { regix } = require("../../helpers/regix");

const AppMaintMaintenanceSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Date_Time: { databaseType: "DATE", validatePattern: regix.date },
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
  Working_Hours: {
    databaseType: "INT NULL",
    validatePattern: regix.int,
    isNull: true,
  },
  Breakdown_Type: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  ProblemCreatedBy: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  Problem: {
    databaseType: "TEXT NULL",
    validatePattern: regix.text,
    isNull: true,
  },
  Action: {
    databaseType: "TEXT NULL",
    validatePattern: regix.text,
    isNull: true,
  },
  ResponseTime: {
    databaseType: "DECIMAL(8,2) NULL",
    validatePattern: regix.decimal82,
    isNull: true,
  },
  Problem_start_From: {
    databaseType: "DATETIME NULL",
    validatePattern: regix.dateTime,
    isNull: true,
  },
  problem_End_To: {
    databaseType: "DATETIME NULL",
    validatePattern: regix.dateTime,
    isNull: true,
  },
  Breakdown_Time: {
    databaseType: "INT NULL",
    validatePattern: regix.int,
    isNull: true,
  },
  Spare_part: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  ResponsibleEngineer: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  CheckTime: {
    databaseType: "INT NULL",
    validatePattern: regix.int,
    isNull: true,
  },
  Status: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  Sent: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  Seen: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
};

module.exports = { AppMaintMaintenanceSchema };
