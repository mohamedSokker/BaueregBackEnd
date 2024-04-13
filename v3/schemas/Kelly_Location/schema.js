const { regix } = require("../../helpers/regix");

const Kelly_LocationSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Start_Date: {
    databaseType: "DATETIME",
    validatePattern: regix.dateTime,
  },
  End_Date: {
    databaseType: "DATETIME",
    validatePattern: regix.dateTime,
  },
  Type: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Code: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  "Equipment Type": {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Status: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { Kelly_LocationSchema };
