const { regix } = require("../../helpers/regix");

const AppStocksSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Code: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  SabCode: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Unit: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Quantity: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Store: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Description: {
    databaseType: "TEXT",
    validatePattern: regix.text,
  },
  Detail: { databaseType: "TEXT", validatePattern: regix.text },
  Position: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { AppStocksSchema };
