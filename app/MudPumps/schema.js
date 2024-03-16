const { regix } = require("../regix");

const MudPumpsSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Start_Date: { databaseType: "DATE", validatePattern: regix.date },
  End_Date: { databaseType: "DATE", validatePattern: regix.date, isNull: true },
  Code: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Status: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { MudPumpsSchema };
