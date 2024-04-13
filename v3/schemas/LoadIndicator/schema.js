const { regix } = require("../../helpers/regix");

const LoadIndicatorSchema = {
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
  System_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { LoadIndicatorSchema };
