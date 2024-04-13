const events = require("events");
const eventEmitter = new events.EventEmitter();

const { model } = require("../model/mainModel");
const { getData } = require("../../v3/helpers/getData");
const { io } = require("../socket/socket");

const getMany = async (Number, table) => {
  try {
    const query = `SELECT TOP ${Number} * FROM ${table} ORDER BY ID DESC`;
    return (await getData(query)).recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

eventEmitter.on("addedOne", async ({ count, table }) => {
  const oldData = [...model[table]];
  const addedData = await getMany(count, table);
  const targetData = oldData.concat(addedData);
  model[table] = targetData;
  //   io.emit("appDataUpdate", model[table]);
});

eventEmitter.on("addedMany", async ({ data, table }) => {
  const oldData = [...model[table]];
  const addedData = await getMany(data, table);
  const sortedAddedData = addedData.sort((a, b) => Number(a.ID) - Number(b.ID));
  const targetData = oldData.concat(sortedAddedData);
  model[table] = targetData;
  //   io.emit("appDataUpdate", model[table]);
});

eventEmitter.on("updatedOne", ({ data, table }) => {
  const oldData = [...model[table]];
  const updatedData = data;
  const targetItem = oldData.find(
    (item) => Number(item.ID) === Number(data.ID)
  );
  const index = oldData.findIndex(
    (item) => Number(item.ID) === Number(data.ID)
  );
  if (targetItem) {
    oldData[index] = { ...targetItem, ...updatedData };
  } else {
    console.log("Item not found.");
  }
  model[table] = oldData;
  //   io.emit("appDataUpdate", model[table]);
});

eventEmitter.on("updatedMany", ({ data, table }) => {
  const oldData = [...model[table]];
  const updatedData = data;
  const targetData = oldData.map((originalItem) => {
    let replacement = updatedData.find(
      (replaceItem) => replaceItem.ID === originalItem.ID
    );

    return replacement ? replacement : originalItem;
  });
  model[table] = targetData;
  //   io.emit("appDataUpdate", model[table]);
});

eventEmitter.on("deletedOne", ({ id, table }) => {
  const oldData = [...model[table]];
  const targetData = oldData.filter((d) => Number(d.ID) !== Number(id));
  model[table] = targetData;
  //   io.emit("appDataUpdate", model[table]);
});

eventEmitter.on("deletedMany", ({ ids, table }) => {
  const oldData = [...model[table]];
  const targetData = oldData.filter((d) => !ids.includes(d.ID));
  model[table] = targetData;
  //   io.emit("appDataUpdate", model[table]);
});

module.exports = { eventEmitter };
