const { regix } = require("../../helpers/regix");

const QCTableSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  UserName: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  TableName: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Data: { databaseType: "TEXT", validatePattern: regix.text },
  Sent: { databaseType: "NVARCHAR(255)", validatePattern: regix.nvarChar255 },
};

module.exports = { QCTableSchema };
