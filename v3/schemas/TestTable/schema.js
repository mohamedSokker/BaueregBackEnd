const TestSchema = {
  ID: {
    databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
    validatePattern: /\d{1,}/gi,
  },
  Data1: { databaseType: "NVARCHAR(255)", validatePattern: /^.{1,255}$/gi },
  Data2: { databaseType: "NVARCHAR(255)", validatePattern: /^.{1,255}$/gi },
};

module.exports = { TestSchema };
