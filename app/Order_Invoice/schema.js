const { regix } = require("../regix");

const Order_InvoiceSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Date: { databaseType: "DATE", validatePattern: regix.date },
  InvoiceNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ReferenceNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  OrderNo: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Description: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ItemNo: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Quantity: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Unit: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Total_EURO: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ShipmentMode: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { Order_InvoiceSchema };
