const { regix } = require("../../helpers/regix");

const AppStocksTransitionSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  DateTime: {
    databaseType: "DATETIME",
    validatePattern: regix.dateTime,
  },
  Code: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  SabCode: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Description: {
    databaseType: "TEXT",
    validatePattern: regix.text,
  },
  Quantity: { databaseType: "DECIMAL(8,2)", validatePattern: regix.decimal82 },
  ItemFrom: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ItemFromNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ItemTo: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  ItemToNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ItemStatus: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  IsPending: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { AppStocksTransitionSchema };
