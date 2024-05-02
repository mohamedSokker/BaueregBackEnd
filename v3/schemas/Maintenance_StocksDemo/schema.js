const { regix } = require("../../helpers/regix");

const Maintenance_StocksDemoSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  DateTime: {
    databaseType: "DATE",
    validatePattern: regix.date,
  },
  Location: {
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
  SparePart_Code: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  SparePart_Quantity: { databaseType: "INT", validatePattern: regix.int },
  Description: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Working_Hours: { databaseType: "INT", validatePattern: regix.int },
  lastWH: { databaseType: "INT", validatePattern: regix.int },
  lastDateChanged: { databaseType: "DATE NULL", validatePattern: regix.date },
  Hours: { databaseType: "INT", validatePattern: regix.int },
  // QuantityInStocks: { databaseType: "INT", validatePattern: regix.int },
  AvaregeConsumption: {
    databaseType: "DECIMAL(8,2)",
    validatePattern: regix.decimal82,
  },
  MaxConsumption: {
    databaseType: "DECIMAL(8,2)",
    validatePattern: regix.decimal82,
  },
  MinQuantity: { databaseType: "INT", validatePattern: regix.int },
  MaxQuantity: { databaseType: "INT", validatePattern: regix.int },
  // Maintenance_ID: { databaseType: "INT", validatePattern: regix.int },
};

module.exports = { Maintenance_StocksDemoSchema };
