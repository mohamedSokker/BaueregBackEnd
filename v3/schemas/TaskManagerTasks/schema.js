const { regix } = require("../../helpers/regix");

const TaskManagerTasksSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  DateTime: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  Category: {
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
  Title: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Description: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Description_Ar: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  ToUser: {
    databaseType: "TEXT NULL",
    validatePattern: regix.text,
    isNull: true,
  },
  StartTime: {
    databaseType: "DATETIME NULL",
    validatePattern: regix.dateTime,
    isNull: true,
  },
  EndTime: {
    databaseType: "DATETIME NULL",
    validatePattern: regix.dateTime,
    isNull: true,
  },
  Periority: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  Duration: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  Workshop: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  Status: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
  IsReady: {
    databaseType: "NVARCHAR(255) NULL",
    validatePattern: regix.nvarChar255,
    isNull: true,
  },
};

module.exports = { TaskManagerTasksSchema };
