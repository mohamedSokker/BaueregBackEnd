const { Maintenance_StocksSchema } = require("./schema");

const validateAddData = (data) => {
  try {
    const schemaKeys = Object.keys(Maintenance_StocksSchema);
    const bodyKeys = Object.keys(data);
    delete bodyKeys.ID;
    const keysValidation = bodyKeys.every((item) => {
      return schemaKeys.includes(item);
    });
    const lengthValidation = schemaKeys.length === bodyKeys.length + 1;
    return keysValidation && lengthValidation;
  } catch (error) {
    throw new Error(error);
  }
};

const validateManyAdd = (data) => {
  try {
    const schemaKeys = Object.keys(Maintenance_StocksSchema);
    return data.every((item) => {
      const bodyKeys = Object.keys(item);
      delete bodyKeys.ID;
      const keysValidation = bodyKeys.every((i) => {
        return schemaKeys.includes(i);
      });
      const lengthValidation = schemaKeys.length === bodyKeys.length + 1;
      return keysValidation && lengthValidation;
    });
  } catch (error) {
    throw new Error(error);
  }
};

const validateupdateData = (data) => {
  try {
    const schemaKeys = Object.keys(Maintenance_StocksSchema);
    const bodyKeys = Object.keys(data);
    delete bodyKeys.ID;
    const keysValidation = bodyKeys.every((item) => {
      return schemaKeys.includes(item);
    });
    return keysValidation;
  } catch (error) {
    throw new Error(error);
  }
};

const validateManyUpdate = (data) => {
  try {
    const schemaKeys = Object.keys(Maintenance_StocksSchema);
    return data.every((item) => {
      const bodyKeys = Object.keys(item);
      delete bodyKeys.ID;
      const keysValidation = bodyKeys.every((i) => {
        return schemaKeys.includes(i);
      });
      return keysValidation;
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  validateAddData,
  validateManyAdd,
  validateupdateData,
  validateManyUpdate,
};
