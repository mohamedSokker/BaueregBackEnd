const { regix } = require("../../helpers/regix");

const EnginesSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Equipment_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Manufacture_Year: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Start_Date: {
    databaseType: "DATE",
    validatePattern: regix.date,
    isNull: true,
  },
  End_Date: { databaseType: "DATE", validatePattern: regix.date, isNull: true },
  Undercarriage_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Engine_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Aspiration_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Engine_Serial: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Power: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Status: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Code: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { EnginesSchema };
