const { regix } = require("../regix");

const Order_QuotationSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Date: { databaseType: "DATE", validatePattern: regix.date },
  QuotationNo: {
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
};

module.exports = { Order_QuotationSchema };
