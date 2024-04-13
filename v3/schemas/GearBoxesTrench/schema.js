const { regix } = require("../../helpers/regix");

const GearBoxesTrenchSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Start_Date: {
    databaseType: "DATE",
    validatePattern: regix.date,
    isNull: true,
  },
  End_Date: { databaseType: "DATE", validatePattern: regix.date, isNull: true },
  Equipment_Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Gearbox: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  "Gearbox Number": {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  "Gearbox Type": {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Status: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { GearBoxesTrenchSchema };
