const { regix } = require("../regix");

const GearBoxesSchema = {
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
  Start_Date: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  End_Date: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  Rotary_Drive: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  GearBox_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Gearbox_Number: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Status: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { GearBoxesSchema };
