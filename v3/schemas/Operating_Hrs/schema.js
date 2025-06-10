const { regix } = require("../../helpers/regix");

const Operating_HrsSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
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

  Start_Date: { databaseType: "DATE", validatePattern: regix.date },
  End_Date: { databaseType: "DATE", validatePattern: regix.date, isNull: true },
  Start_OperatingHrs: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  End_OperatingHrs: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
};

module.exports = { Operating_HrsSchema };
