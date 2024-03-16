const events = require("events");
const Maintenance_StockseventEmitter = new events.EventEmitter();

const { model } = require("../Model");
const { getData } = require("../../functions/getData");

const getMany = async (Number) => {
  try {
    const query = `SELECT TOP ${Number} * FROM Maintenance_Stocks ORDER BY ID DESC`;
    return (await getData(query)).recordsets[0];
  } catch (error) {
    throw new Error(error);
  }
};

Maintenance_StockseventEmitter.on("addedOne", async () => {
  const oldData = [...model.Maintenance_Stocks];
  const addedData = await getMany(1);
  const targetData = oldData.concat(addedData);
  model.Maintenance_Stocks = targetData;
});

Maintenance_StockseventEmitter.on("addedMany", async (data) => {
  const oldData = [...model.Maintenance_Stocks];
  const addedData = await getMany(data);
  const sortedAddedData = addedData.sort((a, b) => Number(a.ID) - Number(b.ID));
  const targetData = oldData.concat(sortedAddedData);
  model.Maintenance_Stocks = targetData;
});

Maintenance_StockseventEmitter.on("updatedOne", (data) => {
  const oldData = [...model.Maintenance_Stocks];
  const updatedData = data;
  const index = oldData.findIndex(
    (item) => Number(item.ID) === Number(data.ID)
  );
  if (index !== -1) {
    oldData[index] = updatedData;
  } else {
    console.log("Item not found.");
  }
  model.Maintenance_Stocks = oldData;
});

Maintenance_StockseventEmitter.on("updatedMany", (data) => {
  const oldData = [...model.Maintenance_Stocks];
  const updatedData = data;
  const targetData = oldData.map((originalItem) => {
    let replacement = updatedData.find(
      (replaceItem) => replaceItem.ID === originalItem.ID
    );

    return replacement ? replacement : originalItem;
  });
  model.Maintenance_Stocks = targetData;
});

Maintenance_StockseventEmitter.on("deletedOne", (id) => {
  const oldData = [...model.Maintenance_Stocks];
  const targetData = oldData.filter((d) => Number(d.ID) !== Number(id));
  model.Maintenance_Stocks = targetData;
});

Maintenance_StockseventEmitter.on("deletedMany", (ids) => {
  const oldData = [...model.Maintenance_Stocks];
  const targetData = oldData.filter((d) => !ids.includes(d.ID));
  model.Maintenance_Stocks = targetData;
});

module.exports = { Maintenance_StockseventEmitter };
