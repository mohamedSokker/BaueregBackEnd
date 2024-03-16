const events = require("events");
const TesteventEmitter = new events.EventEmitter();

const { model } = require("../Model");
const { getData } = require("../../functions/getData");
const { io } = require("../../Socket/socket");

const getMany = async (Number) => {
  try {
    const query = `SELECT TOP ${Number} * FROM Test ORDER BY ID DESC`;
    return (await getData(query)).recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

TesteventEmitter.on("addedOne", async () => {
  const oldData = [...model.Test];
  const addedData = await getMany(1);
  const targetData = oldData.concat(addedData);
  model.Test = targetData;
  io.emit("appDataUpdate", model.Test);
});

TesteventEmitter.on("addedMany", async (data) => {
  const oldData = [...model.Test];
  const addedData = await getMany(data);
  const sortedAddedData = addedData.sort((a, b) => Number(a.ID) - Number(b.ID));
  const targetData = oldData.concat(sortedAddedData);
  model.Test = targetData;
  io.emit("appDataUpdate", model.Test);
});

TesteventEmitter.on("updatedOne", (data) => {
  const oldData = [...model.Test];
  const updatedData = data;
  const index = oldData.findIndex(
    (item) => Number(item.ID) === Number(data.ID)
  );
  if (index !== -1) {
    oldData[index] = updatedData;
  } else {
    console.log("Item not found.");
  }
  model.Test = oldData;
  io.emit("appDataUpdate", model.Test);
});

TesteventEmitter.on("updatedMany", (data) => {
  const oldData = [...model.Test];
  const updatedData = data;
  const targetData = oldData.map((originalItem) => {
    let replacement = updatedData.find(
      (replaceItem) => replaceItem.ID === originalItem.ID
    );

    return replacement ? replacement : originalItem;
  });
  model.Test = targetData;
  io.emit("appDataUpdate", model.Test);
});

TesteventEmitter.on("deletedOne", (id) => {
  const oldData = [...model.Test];
  const targetData = oldData.filter((d) => Number(d.ID) !== Number(id));
  model.Test = targetData;
  io.emit("appDataUpdate", model.Test);
});

TesteventEmitter.on("deletedMany", (ids) => {
  const oldData = [...model.Test];
  const targetData = oldData.filter((d) => !ids.includes(d.ID));
  model.Test = targetData;
  io.emit("appDataUpdate", model.Test);
});

module.exports = { TesteventEmitter };
