// const tableInsertData = require("../Logic/tablesData/tableInsertData");
// const tableUpdateData = require("../Logic/tablesData/tableUpdateData");
// const tableDeleteData = require("../Logic/tablesData/tableDeleteData");
// const tableGetAll = require("../Logic/tablesData/tableGetAll");
// const tableGetSingle = require("../Logic/tablesData/tableGetSingle");
const JSONStream = require("JSONStream");

const { model } = require("../../../../model/mainModel");
const { getData } = require("../../../../helpers/getData");
const {
  // getAllData,
  getOneData,
  addData,
  updateData,
  deleteData,
} = require("../../../../services/mainService");
const { AppStocksSchema } = require("../../../../schemas/AppStocks/schema");

const getAllAppStocks = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["AppStocks"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["AppStocks"].length; i++) {
        jsonStream.write(model["AppStocks"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM AppStocks").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`AppStocks b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`AppStocks a ${memoryDiff / (1024 * 1024)} MB`);
    // const result = await tableGetAll(`AppStocks`, req.query);
    // return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppStocks = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await getOneData(cond, "AppStocks");
    // const cond = req.params.id;
    // const result = await tableGetSingle(`AppStocks`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAppStocks = async (req, res) => {
  try {
    const result = await addData(req.body, "AppStocks", AppStocksSchema);
    // const result = await tableInsertData(req.body, `AppStocks`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAppStocks = async (req, res) => {
  try {
    const targetColVal = req.params.id;
    const result = await updateData(
      req.body,
      targetColVal,
      "AppStocks",
      AppStocksSchema
    );
    // const targetColVal = Object.values(req.params)[0];
    // const result = await tableUpdateData(req.body, `AppStocks`, targetColVal);
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAppStocks = async (req, res) => {
  try {
    const targetColVal = req.params.id;
    const result = await deleteData(targetColVal, "AppStocks");
    // const targetColVal = Object.values(req.params)[0];
    // const result = await tableDeleteData(`AppStocks`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAppStocks,
  getAppStocks,
  addAppStocks,
  updateAppStocks,
  deleteAppStocks,
};
