const { regix } = require("../../helpers/regix");

const AppNotificationSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  DateTime: { databaseType: "DATETIME", validatePattern: regix.dateTime },
  FromUserName: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  FromUserImg: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  ToUser: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Category: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Item: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Body: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Seen: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
  Sent: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { AppNotificationSchema };
