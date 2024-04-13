const { regix } = require("../../helpers/regix");

const AvailabilitySchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Date_Time: {
    databaseType: "DATE",
    validatePattern: regix.date,
  },
  Equipment: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Location: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Periodic_Maintenance: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Breakdown_Time: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Available_Time: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Maintenance_Availability: {
    databaseType: "DECIMAL(8,2)",
    validatePattern: regix.decimal82,
  },
  Site_QC_Time: {
    databaseType: "INT",
    validatePattern: regix.int,
  },
  Site_Availability: {
    databaseType: "DECIMAL(8,2)",
    validatePattern: regix.decimal82,
  },
  Maintenance_ID: {
    databaseType: "INT NULL",
    validatePattern: regix.int,
  },
};

module.exports = { AvailabilitySchema };
