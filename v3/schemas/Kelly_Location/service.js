const { getData } = require("../../functions/getData");
const { Kelly_LocationeventEmitter } = require("./subscribe");
const { model } = require("../Model");
const { Kelly_LocationSchema } = require("./schema");
const {
  validateAddData,
  validateManyAdd,
  validateupdateData,
  validateManyUpdate,
} = require("./validation");

// const getTableData = async () => {
//   try {
//     const getquery = `SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('Kelly_Location')`;
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
    let query = `CREATE TABLE Kelly_Location (`;
    Object.keys(Kelly_LocationSchema).map((item) => {
      query += `${item} ${Kelly_LocationSchema[item].databaseType},`;
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
    if (!model.Kelly_Location) {
      console.log(`From Database`);
      const query = `SELECT * FROM Kelly_Location`;
      const result = (await getData(query)).recordsets[0];
      model.Kelly_Location = result;
      const size = Buffer.byteLength(JSON.stringify(model));
      const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
      const sizeMB = sizeKB / 1024;
      console.log(
        `${size} byte`,
        `${Math.round(sizeKB)} KB`,
        `${Math.round(sizeMB)} MB`
      );
      return result;
    } else {
      console.log(`From Model`);
      const size = Buffer.byteLength(JSON.stringify(model));
      const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
      const sizeMB = sizeKB / 1024;
      console.log(
        `${size} byte`,
        `${Math.round(sizeKB)} KB`,
        `${Math.round(sizeMB)} MB`
      );
      return model.Kelly_Location;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getOneData = async (id) => {
  try {
    if (!model.Kelly_Location) {
      console.log(`One From Database`);
      const query = `SELECT * FROM Kelly_Location WHERE ID = '${id}'`;
      const result = (await getData(query)).recordsets[0];
      return result;
    } else {
      console.log(`One From Model`);
      return model.Kelly_Location.filter((item) => item.ID === Number(id));
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addData = async (bodyData) => {
  try {
    let query = `INSERT INTO Kelly_Location VALUES ( `;
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
      Kelly_LocationeventEmitter.emit("addedOne", 1);
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
        query += `INSERT INTO Kelly_Location VALUES ( `;
        Object.keys(bodyData).map((item) => {
          if (item !== "ID") {
            query += `'${bodyData[item]}',`;
          }
        });
        query = query.slice(0, -1);
        query += ") ";
      });
      const result = await getData(query);
      Kelly_LocationeventEmitter.emit("addedMany", data.length);
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
    let query = `UPDATE Kelly_Location SET `;
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
      Kelly_LocationeventEmitter.emit("updatedOne", {
        ID: Number(id),
        ...bodyData,
      });
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
        query += ` UPDATE Kelly_Location SET `;
        Object.keys(bodyData).map((item) => {
          if (item !== "ID") {
            query += `${item} = '${bodyData[item]}',`;
          }
        });
        query = query.slice(0, -1);
        query += ` WHERE ID = '${bodyData.ID}' `;
      });

      const result = await getData(query);
      Kelly_LocationeventEmitter.emit("updatedMany", data);
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
    let query = `DELETE FROM Kelly_Location WHERE ID = '${id}'`;
    const result = await getData(query);
    Kelly_LocationeventEmitter.emit("deletedOne", id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMany = async (ids) => {
  try {
    let query = ``;
    ids.map((id) => {
      query += `DELETE FROM Kelly_Location WHERE ID = '${id}' `;
    });
    const result = await getData(query);
    Kelly_LocationeventEmitter.emit("deletedMany", ids);
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
