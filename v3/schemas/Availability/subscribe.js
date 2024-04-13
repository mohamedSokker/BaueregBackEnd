const events = require("events");
const AvailabilityeventEmitter = new events.EventEmitter();

const { model } = require("../Model");
const { getData } = require("../../functions/getData");
const { io } = require("../../Socket/socket");

const getMany = async (Number) => {
  try {
    const query = `SELECT TOP ${Number} * FROM Availability ORDER BY ID DESC`;
    return (await getData(query)).recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

AvailabilityeventEmitter.on("addedOne", async () => {
  const oldData = [...model.Availability];
  const addedData = await getMany(1);
  const targetData = oldData.concat(addedData);
  model.Availability = targetData;
  io.emit("appDataUpdate", model.Availability);
});

AvailabilityeventEmitter.on("addedMany", async (data) => {
  const oldData = [...model.Availability];
  const addedData = await getMany(data);
  const sortedAddedData = addedData.sort((a, b) => Number(a.ID) - Number(b.ID));
  const targetData = oldData.concat(sortedAddedData);
  model.Availability = targetData;
  io.emit("appDataUpdate", model.Availability);
});

AvailabilityeventEmitter.on("updatedOne", (data) => {
  const oldData = [...model.Availability];
  const updatedData = data;
  const index = oldData.findIndex(
    (item) => Number(item.ID) === Number(data.ID)
  );
  if (index !== -1) {
    oldData[index] = updatedData;
  } else {
    console.log("Item not found.");
  }
  model.Availability = oldData;
  io.emit("appDataUpdate", model.Availability);
});

AvailabilityeventEmitter.on("updatedMany", (data) => {
  const oldData = [...model.Availability];
  const updatedData = data;
  const targetData = oldData.map((originalItem) => {
    let replacement = updatedData.find(
      (replaceItem) => replaceItem.ID === originalItem.ID
    );

    return replacement ? replacement : originalItem;
  });
  model.Availability = targetData;
  io.emit("appDataUpdate", model.Availability);
});

AvailabilityeventEmitter.on("deletedOne", (id) => {
  const oldData = [...model.Availability];
  const targetData = oldData.filter((d) => Number(d.ID) !== Number(id));
  model.Availability = targetData;
  io.emit("appDataUpdate", model.Availability);
});

AvailabilityeventEmitter.on("deletedMany", (ids) => {
  const oldData = [...model.Availability];
  const targetData = oldData.filter((d) => !ids.includes(d.ID));
  model.Availability = targetData;
  io.emit("appDataUpdate", model.Availability);
});

module.exports = { AvailabilityeventEmitter };
