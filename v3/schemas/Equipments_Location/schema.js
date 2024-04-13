const { regix } = require("../../helpers/regix");

const Equipments_LocationSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Start_Date: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  End_Date: {
    databaseType: "DATETIME NULL",
    validatePattern: regix.dateTimeOrNull,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  UnderCarrage_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Equipment_Type: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { Equipments_LocationSchema };
