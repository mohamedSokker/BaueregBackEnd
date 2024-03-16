const { regix } = require("../regix");

const Order_NumberSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Order_No: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Date: { databaseType: "DATE", validatePattern: regix.date },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Quantity: { databaseType: "INT", validatePattern: regix.int },
  Unit: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Description: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  PartNumber: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Status: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { Order_NumberSchema };
