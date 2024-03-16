const { regix } = require("../regix");

const Recieved_InvoicesSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Invoices: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  OrderNos: {
    databaseType: "TEXT",
    validatePattern: regix.text,
  },
  Equipments: {
    databaseType: "TEXT",
    validatePattern: regix.text,
  },
  Received_Date: { databaseType: "DATE", validatePattern: regix.date },
};

module.exports = { Recieved_InvoicesSchema };
