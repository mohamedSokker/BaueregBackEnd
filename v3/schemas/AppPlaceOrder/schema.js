const { regix } = require("../../helpers/regix");

const AppPlaceOrderSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  DateTime: {
    databaseType: "DATETIME",
    validatePattern: regix.dateTime,
  },
  OrderNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Code: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  SabCode: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Unit: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Quantity: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Description: {
    databaseType: "TEXT",
    validatePattern: regix.text,
  },
  FromStore: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ToUser: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Confirmed: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { AppPlaceOrderSchema };
