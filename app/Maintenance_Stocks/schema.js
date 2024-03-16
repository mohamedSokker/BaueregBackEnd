const { regix } = require("../regix");

const Maintenance_StocksSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  SparePart_Code: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Quantity: { databaseType: "INT", validatePattern: regix.int },
  Maintenance_ID: { databaseType: "INT", validatePattern: regix.int },
};

module.exports = { Maintenance_StocksSchema };
