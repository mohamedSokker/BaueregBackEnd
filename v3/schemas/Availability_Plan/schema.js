const { regix } = require("../../helpers/regix");

const Availability_PlanSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  DateFrom: { databaseType: "DATE", validatePattern: regix.date },
  DateTo: { databaseType: "DATE", validatePattern: regix.date },
  Friday: { databaseType: "INT", validatePattern: regix.int },
  Saturday: { databaseType: "INT", validatePattern: regix.int },
  Sunday: { databaseType: "INT", validatePattern: regix.int },
  Monday: { databaseType: "INT", validatePattern: regix.int },
  Tuesday: { databaseType: "INT", validatePattern: regix.int },
  Wednesday: { databaseType: "INT", validatePattern: regix.int },
  Thursday: { databaseType: "INT", validatePattern: regix.int },
};

module.exports = { Availability_PlanSchema };
