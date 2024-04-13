const { getData } = require("../../functions/getData");
const { TesteventEmitter } = require("./subscribe");
const { model } = require("../Model");
const { TestSchema } = require("./schema");
const {
  validateAddData,
  validateManyAdd,
  validateupdateData,
  validateManyUpdate,
} = require("./validation");

// const getTableData = async () => {
//   try {
//     const getquery = `SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('Test')`;
//     const data = (await getData(getquery)).recordsets[0];
//     let result = {};
//     data.map((d) => {
//       result[d.name] = null;
//     });
//     console.log(result);
//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// getTableData();

const createTable = async () => {
  try {
    let query = `CREATE TABLE Test (`;
    Object.keys(TestSchema).map((item) => {
      query += `${item} ${TestSchema[item].databaseType},`;
    });
    query = query.slice(0, -1);
    query += ")";
    await getData(query);
    return `Success`;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllData = async () => {
  try {
    if (!model.Test) {
      console.log(`From Database`);
      const query = `SELECT * FROM Test`;
      const result = (await getData(query)).recordsets[0];
      model.Test = result;
      return result;
    } else {
      console.log(`From Model`);
      return model.Test;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getOneData = async (id) => {
  try {
    if (!model.Test) {
      console.log(`One From Database`);
      const query = `SELECT * FROM Test WHERE ID = '${id}'`;
      const result = (await getData(query)).recordsets[0];
      return result;
    } else {
      console.log(`One From Model`);
      return model.Test.filter((item) => item.ID === Number(id));
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addData = async (bodyData) => {
  try {
    let query = `INSERT INTO Test VALUES ( `;
    const validation = validateAddData(bodyData);
    if (validation) {
      Object.keys(bodyData).map((item) => {
        if (item !== "ID") {
          query += `'${bodyData[item]}',`;
        }
      });
      query = query.slice(0, -1);
      query += ") ";
      const result = await getData(query);
      TesteventEmitter.emit("addedOne", 1);
      return result;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addMany = async (data) => {
  try {
    let query = ``;
    const validation = validateManyAdd(data);
    if (validation) {
      data.map((bodyData) => {
        query += `INSERT INTO Test VALUES ( `;
        Object.keys(bodyData).map((item) => {
          if (item !== "ID") {
            query += `'${bodyData[item]}',`;
          }
        });
        query = query.slice(0, -1);
        query += ") ";
      });
      const result = await getData(query);
      TesteventEmitter.emit("addedMany", data.length);
      return result;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateData = async (bodyData, id) => {
  try {
    let query = `UPDATE Test SET `;
    const validation = validateupdateData(bodyData);
    if (validation) {
      Object.keys(bodyData).map((item) => {
        if (item !== "ID") {
          query += `${item} = '${bodyData[item]}',`;
        }
      });
      query = query.slice(0, -1);
      query += ` WHERE ID = '${id}'`;
      const result = await getData(query);
      TesteventEmitter.emit("updatedOne", { ID: Number(id), ...bodyData });
      return result;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateMany = async (data) => {
  try {
    let query = ``;
    const validation = validateManyUpdate(data);
    if (validation) {
      data.map((bodyData) => {
        query += ` UPDATE Test SET `;
        Object.keys(bodyData).map((item) => {
          if (item !== "ID") {
            query += `${item} = '${bodyData[item]}',`;
          }
        });
        query = query.slice(0, -1);
        query += ` WHERE ID = '${bodyData.ID}' `;
      });

      const result = await getData(query);
      TesteventEmitter.emit("updatedMany", data);
      return result;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteData = async (id) => {
  try {
    let query = `DELETE FROM Test WHERE ID = '${id}'`;
    const result = await getData(query);
    TesteventEmitter.emit("deletedOne", id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMany = async (ids) => {
  try {
    let query = ``;
    ids.map((id) => {
      query += `DELETE FROM Test WHERE ID = '${id}' `;
    });
    const result = await getData(query);
    TesteventEmitter.emit("deletedMany", ids);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createTable,
  getAllData,
  getOneData,
  addData,
  addMany,
  updateData,
  updateMany,
  deleteData,
  deleteMany,
};
