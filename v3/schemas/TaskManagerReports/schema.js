const { regix } = require("../../helpers/regix");

const TaskManagerReportsSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  DateTime: { databaseType: "DATETIME", validatePattern: regix.dateTime },
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
  ReportData: { databaseType: "TEXT", validatePattern: regix.text },
  UserName: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  UserImage: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Status: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Sent: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { TaskManagerReportsSchema };
