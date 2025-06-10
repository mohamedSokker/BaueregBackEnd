const { regix } = require("../../helpers/regix");

const Order_ConfirmationSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Date: { databaseType: "DATE", validatePattern: regix.date },
  ConfirmationNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  OrderNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  PartNo: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Description: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Quantity: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Unit: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  UnitPrice: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  TotalPrice: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  DeliveryDate: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ShipmentMode: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { Order_ConfirmationSchema };
