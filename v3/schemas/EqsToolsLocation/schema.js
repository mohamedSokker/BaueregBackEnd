const { regix } = require("../../helpers/regix");

const EqsToolsLocationSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  ToolID: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Start_Date: {
    databaseType: "DATE",
    validatePattern: regix.date,
  },
  End_Date: {
    databaseType: "DATE",
    validatePattern: regix.date,
  },
  Start_WH: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  End_WH: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { EqsToolsLocationSchema };
