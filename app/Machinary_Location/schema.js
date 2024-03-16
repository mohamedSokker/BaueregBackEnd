const { regix } = require("../regix");

const Machinary_LocationSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Machinery_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Machinery_Model: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Machinary_Specs: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Code: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Serial_No: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Machinery_Status: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Start_Date: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  End_Date: {
    databaseType: "DATETIME NULL",
    validatePattern: regix.dateTimeOrNull,
  },
};

module.exports = { Machinary_LocationSchema };
