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
const {
  AppStocksTransitionSchema,
} = require("../../../../schemas/AppStocksTransition/schema");

const getAllAppStocksTransition = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["AppStocksTransition"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["AppStocksTransition"].length; i++) {
        jsonStream.write(model["AppStocksTransition"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM AppStocksTransition").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(
      `AppStocksTransition b ${memoryUsageBefore / (1024 * 1024)} MB`
    );
    console.log(`AppStocksTransition a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppStocksTransition = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await getOneData(cond, "AppStocksTransition");
    // const cond = req.params.id;
    // const result = await tableGetSingle(`AppStocksTransition`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAppStocksTransition = async (req, res) => {
  try {
    const result = await addData(
      req.body,
      "AppStocksTransition",
      AppStocksTransitionSchema
    );
    // const result = await tableInsertData(req.body, `AppStocksTransition`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAppStocksTransition = async (req, res) => {
  try {
    const targetColVal = req.params.id;
    const result = await updateData(
      req.body,
      targetColVal,
      "AppStocksTransition",
      AppStocksTransitionSchema
    );
    // const targetColVal = Object.values(req.params)[0];
    // const result = await tableUpdateData(
    //   req.body,
    //   `AppStocksTransition`,
    //   targetColVal
    // );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAppStocksTransition = async (req, res) => {
  try {
    const targetColVal = req.params.id;
    const result = await deleteData(targetColVal, "AppStocksTransition");
    // const targetColVal = Object.values(req.params)[0];
    // const result = await tableDeleteData(`AppStocksTransition`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAppStocksTransition,
  getAppStocksTransition,
  addAppStocksTransition,
  updateAppStocksTransition,
  deleteAppStocksTransition,
};
