const events = require("events");
const Kelly_LocationeventEmitter = new events.EventEmitter();

const { model } = require("../Model");
const { getData } = require("../../functions/getData");
const { io } = require("../../Socket/socket");

const getMany = async (Number) => {
  try {
    const query = `SELECT TOP ${Number} * FROM Kelly_Location ORDER BY ID DESC`;
    return (await getData(query)).recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

Kelly_LocationeventEmitter.on("addedOne", async () => {
  const oldData = [...model.Kelly_Location];
  const addedData = await getMany(1);
  const targetData = oldData.concat(addedData);
  model.Kelly_Location = targetData;
  io.emit("appDataUpdate", model.Kelly_Location);
});

Kelly_LocationeventEmitter.on("addedMany", async (data) => {
  const oldData = [...model.Kelly_Location];
  const addedData = await getMany(data);
  const sortedAddedData = addedData.sort((a, b) => Number(a.ID) - Number(b.ID));
  const targetData = oldData.concat(sortedAddedData);
  model.Kelly_Location = targetData;
  io.emit("appDataUpdate", model.Kelly_Location);
});

Kelly_LocationeventEmitter.on("updatedOne", (data) => {
  const oldData = [...model.Kelly_Location];
  const updatedData = data;
  const index = oldData.findIndex(
    (item) => Number(item.ID) === Number(data.ID)
  );
  if (index !== -1) {
    oldData[index] = updatedData;
  } else {
    console.log("Item not found.");
  }
  model.Kelly_Location = oldData;
  io.emit("appDataUpdate", model.Kelly_Location);
});

Kelly_LocationeventEmitter.on("updatedMany", (data) => {
  const oldData = [...model.Kelly_Location];
  const updatedData = data;
  const targetData = oldData.map((originalItem) => {
    let replacement = updatedData.find(
      (replaceItem) => replaceItem.ID === originalItem.ID
    );

    return replacement ? replacement : originalItem;
  });
  model.Kelly_Location = targetData;
  io.emit("appDataUpdate", model.Kelly_Location);
});

Kelly_LocationeventEmitter.on("deletedOne", (id) => {
  const oldData = [...model.Kelly_Location];
  const targetData = oldData.filter((d) => Number(d.ID) !== Number(id));
  model.Kelly_Location = targetData;
  io.emit("appDataUpdate", model.Kelly_Location);
});

Kelly_LocationeventEmitter.on("deletedMany", (ids) => {
  const oldData = [...model.Kelly_Location];
  const targetData = oldData.filter((d) => !ids.includes(d.ID));
  model.Kelly_Location = targetData;
  io.emit("appDataUpdate", model.Kelly_Location);
});

module.exports = { Kelly_LocationeventEmitter };
