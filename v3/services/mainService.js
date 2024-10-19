const bcrypt = require("bcrypt");

const sql = require("mssql");
const { getData } = require("../../v3/helpers/getData");
const { eventEmitter } = require("../subscriber/mainSubscriber");
const { model } = require("../model/mainModel");
const XLSX = require("xlsx");
const XlsxAll = require("../../v3/helpers/XlsxAll");
// const { TestSchema } = require("./schema");
const {
  validateAddData,
  validateManyAdd,
  validateupdateData,
  validateManyUpdate,
} = require("../validations/mainValidation");
const { EqsToolsSchema } = require("../schemas/EqsTools/schema");
const {
  EqsToolsLocationSchema,
} = require("../schemas/EqsToolsLocation/schema");
const { OilSamplesSchema } = require("../schemas/OilSamples/schema");
const { sheerToJson } = require("../helpers/sheetToJson");
const { ManageDataEntrySchema } = require("../schemas/ManageDataEntry/schema");
const {
  TaskManagerTasksSchema,
} = require("../schemas/TaskManagerTasks/schema");
require("dotenv").config();

const config = require("../config/config");

// const getDate = (date) => {
//   const dt = new Date(date);
//   dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
//   return dt.toISOString().slice(0, 16);
// };

const getTableData = async (table) => {
  try {
    const getquery = `SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('${table}')`;
    const data = (await getData(getquery)).recordsets[0];
    // let result = {};
    // data.map((d) => {
    //   result[d.name] = {};
    // });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getTables = async () => {
  try {
    const query =
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";
    const data = await getData(query);
    model["AllTables"] = data.recordsets[0];
    const size = Buffer.byteLength(JSON.stringify(model));
    const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
    const sizeMB = sizeKB / 1024;
    const memoryUsage = process.memoryUsage().rss;
    // console.log(
    //   `${size} byte`,
    //   `${sizeKB.toFixed(2)} KB`,
    //   `${sizeMB.toFixed(2)} MB`
    // );
    console.log(`Tables ${memoryUsage / (1024 * 1024)} MB`);
    return data.recordsets[0];
  } catch (error) {
    console.log(error.message);
  }
};

// getTableData("WorkShops");

const createTable = async (table, schema) => {
  try {
    let query = `CREATE TABLE "${table}" (`;
    Object.keys(schema).map((item) => {
      query += `"${item}" ${schema[item].databaseType},`;
    });
    query = query.slice(0, -1);
    query += ")";
    console.log(query);
    await getData(query);
    return `Success`;
  } catch (error) {
    throw new Error(error);
  }
};

const createTableQuery = async (table, schema) => {
  try {
    let query = `CREATE TABLE ${table} (`;
    Object.keys(schema).map((item) => {
      query += `${item} ${schema[item].databaseType},`;
    });
    query = query.slice(0, -1);
    query += ")";
    console.log(query);
    // await getData(query);
    return `Success`;
  } catch (error) {
    throw new Error(error);
  }
};

// createTable("ManageDataEntry", ManageDataEntrySchema);
// createTable("TaskManagerTasks", TaskManagerTasksSchema);

const deleteTable = async (table) => {
  try {
    const query = `DROP TABLE ${table}`;
    console.log(query);
    await getData(query);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTableAllData = async (table) => {
  try {
    const query = `DELETE FROM ${table}`;
    console.log(query);
    await getData(query);
  } catch (error) {
    throw new Error(error);
  }
};

// deleteTableAllData("OilConsumption");

// deleteTable("TaskManagerTasks");
// deleteTable("EqsToolsLocation");

const getAllCons = async () => {
  try {
    if (!model["fuelCons"] || !model["oilCons"]) {
      const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
      return XlsxAll(consurl).then((cons) => {
        model["fuelCons"] = sheerToJson(cons.Sheets[`Fuel Consumption`]);
        model["oilCons"] = sheerToJson(cons.Sheets[`Oil Consumption`]);
        const size = Buffer.byteLength(JSON.stringify(model));
        const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
        const sizeMB = sizeKB / 1024;
        const memoryUsage = process.memoryUsage().rss;
        // console.log(
        //   `${size} byte`,
        //   `${sizeKB.toFixed(2)} KB`,
        //   `${sizeMB.toFixed(2)} MB`
        // );
        console.log(`cons ${memoryUsage / (1024 * 1024)} MB`);
        return { fuelCons: model["fuelCons"], oilCons: model["oilCons"] };
      });
    } else {
      console.log(`From Model`);
      const size = Buffer.byteLength(JSON.stringify(model));
      const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
      const sizeMB = sizeKB / 1024;
      console.log(
        `${size} byte`,
        `${sizeKB.toFixed(2)} KB`,
        `${sizeMB.toFixed(2)} MB`
      );
      return { fuelCons: model["fuelCons"], oilCons: model["oilCons"] };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getAllProd = async () => {
  try {
    if (!model["prodTrench"] || !model["prodDrill"]) {
      const produrl = process.env.ONEDRIVE_URL;
      return XlsxAll(produrl).then((prod) => {
        model["prodDrill"] = sheerToJson(prod.Sheets["Piles"]);
        model["prodTrench"] = [
          ...sheerToJson(prod.Sheets["DW"]),
          ...sheerToJson(prod.Sheets["Cut-Off Wall"]),
          ...sheerToJson(prod.Sheets["Barrettes"]),
        ];
        const size = Buffer.byteLength(JSON.stringify(model));
        const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
        const sizeMB = sizeKB / 1024;
        const memoryUsage = process.memoryUsage().rss;
        // console.log(
        //   `${size} byte`,
        //   `${sizeKB.toFixed(2)} KB`,
        //   `${sizeMB.toFixed(2)} MB`
        // );
        console.log(`prod ${memoryUsage / (1024 * 1024)} MB`);
        return {
          prodDrill: model["prodDrill"],
          prodTrench: model["prodTrench"],
        };
      });
    } else {
      console.log(`From Model`);
      const size = Buffer.byteLength(JSON.stringify(model));
      const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
      const sizeMB = sizeKB / 1024;
      console.log(
        `${size} byte`,
        `${sizeKB.toFixed(2)} KB`,
        `${sizeMB.toFixed(2)} MB`
      );
      return {
        prodDrill: model["prodDrill"],
        prodTrench: model["prodTrench"],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getAllData = async (table) => {
  // try {
  if (!model[table]) {
    console.log(`From Database ${table}`);
    const query = `SELECT * FROM ${table}`;
    return getData(query)
      .then((data) => {
        model[table] = data.recordsets[0];
        const size = Buffer.byteLength(JSON.stringify(model));
        const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
        const sizeMB = sizeKB / 1024;
        const memoryUsage = process.memoryUsage().rss;
        // console.log(
        //   `${size} byte`,
        //   `${sizeKB.toFixed(2)} KB`,
        //   `${sizeMB.toFixed(2)} MB`
        // );
        console.log(`${table}  ${memoryUsage / (1024 * 1024)} MB`);
        return data.recordsets[0];
        // console.log(table);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log(`From Model ${table}`);
    const size = Buffer.byteLength(JSON.stringify(model));
    const sizeKB = Buffer.byteLength(JSON.stringify(model)) / 1024;
    const sizeMB = sizeKB / 1024;
    const memoryUsage = process.memoryUsage().rss;
    console.log(
      `${size} byte`,
      `${sizeKB.toFixed(2)} KB`,
      `${sizeMB.toFixed(2)} MB`
    );
    console.log(`${table}  ${memoryUsage / (1024 * 1024)} MB`);
    return model[table];
  }
  // } catch (error) {
  //   throw new Error(error);
  // }
};

const getOneData = async (id, table) => {
  try {
    if (!model[table]) {
      console.log(`One From Database`);
      const query = `SELECT * FROM ${table} WHERE ID = '${id}'`;
      const result = (await getData(query)).recordsets[0];
      return result;
    } else {
      console.log(`One From Model`);
      return model[table].filter((item) => item.ID === Number(id));
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getMany = async (Number, table) => {
  try {
    const query = `SELECT TOP ${Number} * FROM ${table} ORDER BY ID DESC`;
    return (await getData(query)).recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

const addData = async (bodyData, table, schema) => {
  try {
    let query = `INSERT INTO ${table} VALUES ( `;
    const validation = validateAddData(bodyData, schema);
    if (validation) {
      const keysData = Object.keys(schema);
      for (let i = 0; i < keysData.length; i++) {
        if (keysData[i] === "Password") {
          query += `'${await bcrypt.hash(bodyData[keysData[i]], 10)}',`;
        } else if (keysData[i] !== "ID") {
          if (bodyData[keysData[i]] === null) {
            query += "NULL,";
          } else if (bodyData[keysData[i]] === "Date.Now") {
            query += `'${new Date().toISOString()}',`;
          } else {
            query += `'${bodyData[keysData[i]]}',`;
          }
        }
      }
      query = query.slice(0, -1);
      query += ") ";
      console.log(query);
      const result = await getData(query);
      query = null;
      eventEmitter.emit("addedOne", { count: 1, table: table });
      return result.recordsets[0];
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const addDataQuery = async (bodyData, table, schema) => {
  try {
    let query = `INSERT INTO ${table} VALUES ( `;
    const validation = validateAddData(bodyData, schema);
    if (validation) {
      const keysData = Object.keys(bodyData);
      for (let i = 0; i < keysData.length; i++) {
        if (keysData[i] === "Password") {
          query += `'${await bcrypt.hash(bodyData[keysData[i]], 10)}',`;
        } else if (keysData[i] !== "ID") {
          if (bodyData[keysData[i]] === null) {
            query += "NULL,";
          } else if (bodyData[keysData[i]] === "Date.Now") {
            query += `'${new Date().toISOString()}',`;
          } else {
            query += `'${bodyData[keysData[i]]}',`;
          }
        }
      }
      query = query.slice(0, -1);
      query += ") ";
      console.log(query);
      return `Success`;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const performQueryOneConnection = async (pool, query) => {
  return pool
    .request()
    .query(query)
    .then((result) => {
      const memoryUsage = process.memoryUsage().rss;
      console.log(`${memoryUsage / (1024 * 1024)} MB`);
    })
    .catch((err) => {
      console.log(`Error Processing Query ${err.message}`);
    });
};

const addMany = async (data, table, schema) => {
  try {
    let query = ``;
    const validation = validateManyAdd(data, schema);
    if (validation) {
      sql.connect(config).then((pool) => {
        let promise = Promise.resolve();

        let count = 1;
        data.forEach((d) => {
          promise = promise.then(async () => {
            query += `INSERT INTO ${table} VALUES ( `;
            Object.keys(d).map(async (item) => {
              if (item === "Password") {
                query += `'${await bcrypt.hash(d[item], 10)}',`;
              } else if (item !== "ID") {
                if (d[item] === null) {
                  query += "NULL,";
                } else if (d[item] === "Date.Now") {
                  query += `'${new Date().toISOString()}',`;
                } else {
                  query += `'${d[item]}',`;
                }
              }
            });
            query = query.slice(0, -1);
            query += ") ";
            if (count === 50) {
              console.log(`${query}\n`);

              await performQueryOneConnection(pool, query);
              count = 0;
              query = ``;
            }
            count++;
          });
        });
        return promise
          .then(() => {
            if (query !== ``) {
              console.log(`${query}\n`);
              return performQueryOneConnection(pool, query);
            }
          })
          .then(() => {
            return pool.close(); // Close the connection pool
          })
          .then(() => {
            eventEmitter.emit("addedMany", { data: data.length, table, table });
          })
          .then(() => {
            query = null;
          })
          .then(() => {
            return `Success`;
          })
          .catch((err) => {
            console.log(`Error ${err.message}`);
          });
      });

      // console.log(query);
      // const result = await getData(query);
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
};

const addManyQuery = async (data, table, schema) => {
  try {
    let query = ``;
    const validation = validateManyAdd(data, schema);
    if (validation) {
      let count = 1;
      for (let i = 0; i < data.length; i++) {
        query += `INSERT INTO ${table} VALUES ( `;
        Object.keys(data[i]).map(async (item) => {
          if (item === "Password") {
            query += `'${await bcrypt.hash(data[i][item], 10)}',`;
          } else if (item !== "ID") {
            if (data[i][item] === null) {
              query += "NULL,";
            } else if (data[i][item] === "Date.Now") {
              query += `'${new Date().toISOString()}',`;
            } else {
              query += `'${data[i][item]}',`;
            }
          }
        });
        query = query.slice(0, -1);
        query += ") ";
        if (count === 2) {
          count = 0;
          console.log(`${query}\n`);
          query = ``;
        }
        count++;
      }
      if (query !== ``) console.log(`${query}\n`);
      return `Success`;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateData = async (bodyData, id, table, schema) => {
  try {
    let query = `UPDATE ${table} SET `;
    const validation = validateupdateData(bodyData, schema);
    const keysData = Object.keys(bodyData);
    let newBody = {};
    if (validation) {
      for (let i = 0; i < keysData.length; i++) {
        console.log(keysData[i]);
        if (keysData[i] === "Password") {
          newBody = {
            ...newBody,
            [keysData[i]]: await bcrypt.hash(bodyData[keysData[i]], 10),
          };
          console.log(`hits password`);
          query += `"${keysData[i]}" = '${await bcrypt.hash(
            bodyData[keysData[i]],
            10
          )}',`;
        } else if (keysData[i] !== "ID") {
          newBody = { ...newBody, [keysData[i]]: bodyData[keysData[i]] };
          if (bodyData[keysData[i]] === null) {
            query += `"${keysData[i]}" = NULL,`;
          } else if (bodyData[keysData[i]] === "Date.Now") {
            query += `"${keysData[i]}" = '${new Date().toISOString()}',`;
          } else {
            query += `"${keysData[i]}" = '${bodyData[keysData[i]]}',`;
          }
        }
      }
      query = query.slice(0, -1);
      query += ` WHERE ID = '${id}'`;
      console.log(query);
      const result = await getData(query);
      query = null;
      eventEmitter.emit("updatedOne", {
        data: { ID: Number(id), ...newBody },
        table: table,
      });
      return result.recordsets[0];
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateDataQuery = async (bodyData, id, table, schema) => {
  try {
    let query = `UPDATE ${table} SET `;
    const validation = validateupdateData(bodyData, schema);
    if (validation) {
      Object.keys(bodyData).map(async (item) => {
        if (item === "Password") {
          query += `"${item}" = '${await bcrypt.hash(bodyData[item], 10)}',`;
        } else if (item !== "ID") {
          if (bodyData[item] === null) {
            query += `"${item}" = NULL,`;
          } else if (bodyData[item] === "Date.Now") {
            query += `"${item}" = '${new Date().toISOString()}',`;
          } else {
            query += `"${item}" = '${bodyData[item]}',`;
          }
        }
      });
      query = query.slice(0, -1);
      query += ` WHERE ID = '${id}'`;
      console.log(query);
      return query;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateMany = async (data, table, schema) => {
  try {
    let query = ``;
    const validation = validateManyUpdate(data, schema);
    if (validation) {
      sql.connect(config).then((pool) => {
        let promise = Promise.resolve();

        data.forEach((bodyData) => {
          promise = promise.then(() => {
            query += ` UPDATE ${table} SET `;
            Object.keys(bodyData).map(async (item) => {
              if (item === "Password") {
                query += `"${item}" = '${await bcrypt.hash(
                  bodyData[item],
                  10
                )}',`;
              } else if (item !== "ID") {
                if (bodyData[item] === null) {
                  query += `"${item}" = NULL,`;
                } else if (bodyData[item] === "Date.Now") {
                  query += `"${item}" = '${new Date().toISOString()}',`;
                } else {
                  query += `"${item}" = '${bodyData[item]}',`;
                }
              }
            });
            query = query.slice(0, -1);
            query += ` WHERE ID = '${bodyData.ID}' `;
          });
        });

        return promise
          .then(() => {
            console.log(query);
            return performQueryOneConnection(pool, query);
          })
          .then(() => {
            return `Success`;
          })
          .then(() => {
            return pool.close(); // Close the connection pool
          })
          .then(() => {
            query = null;
          })
          .then(() => {
            eventEmitter.emit("updatedMany", { data: data, table: table });
          });
      });
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateManyQuery = async (data, table, schema) => {
  try {
    let query = ``;
    const validation = validateManyUpdate(data, schema);
    if (validation) {
      data.map((bodyData) => {
        query += ` UPDATE ${table} SET `;
        Object.keys(bodyData).map(async (item) => {
          if (item === "Password") {
            query += `"${item}" = '${await bcrypt.hash(bodyData[item], 10)}',`;
          } else if (item !== "ID") {
            if (bodyData[item] === null) {
              query += `"${item}" = NULL,`;
            } else if (bodyData[item] === "Date.Now") {
              query += `"${item}" = '${new Date().toISOString()}',`;
            } else {
              query += `"${item}" = '${bodyData[item]}',`;
            }
          }
        });
        query = query.slice(0, -1);
        query += ` WHERE ID = '${bodyData.ID}' `;
      });
      console.log(query);
      return query;
    } else {
      throw new Error(`Validation Failed`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteData = async (id, table) => {
  try {
    let query = `DELETE FROM ${table} WHERE ID = '${id}'`;
    console.log(query);
    const result = await getData(query);
    query = null;
    eventEmitter.emit("deletedOne", { id: id, table: table });
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

// deleteData("18", "ManageDataEntry");
// deleteData("5", "ManageDataEntry");

const deleteDataQuery = async (id, table) => {
  try {
    let query = `DELETE FROM ${table} WHERE ID = '${id}'`;
    console.log(query);
    return query;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMany = async (ids, table) => {
  try {
    let query = ``;
    ids.map((id) => {
      query += `DELETE FROM ${table} WHERE ID = '${id}' `;
    });
    const result = await getData(query);
    query = null;
    eventEmitter.emit("deletedMany", { ids: ids, table: table });
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

const deleteManyQuery = async (ids, table) => {
  try {
    let query = ``;
    ids.map((id) => {
      query += `DELETE FROM ${table} WHERE ID = '${id}' `;
    });
    return query;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createTable,
  createTableQuery,
  getTables,
  getTableData,
  getAllCons,
  getAllProd,
  getAllData,
  getOneData,
  addData,
  addDataQuery,
  addMany,
  addManyQuery,
  updateData,
  updateDataQuery,
  updateMany,
  updateManyQuery,
  deleteData,
  deleteDataQuery,
  deleteMany,
  deleteManyQuery,
};
