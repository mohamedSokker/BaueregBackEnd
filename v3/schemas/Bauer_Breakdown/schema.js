const { regix } = require("../../helpers/regix");

const Bauer_BreakdownSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: regix.int,
  },
  Trench_Cutting_Machine: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Drilling_Machine: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Heavy_Crane: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Crane_25_Ton: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Micro_Piling_Machine: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Excavator: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
  Forklift: {
    databaseType: "NVARCHAR(255)",
    validatePattern: regix.nvarChar255,
  },
};

module.exports = { Bauer_BreakdownSchema };
