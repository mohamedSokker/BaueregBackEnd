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
  AppNotificationSchema,
} = require("../../../../schemas/AppNotification/schema");

const getAllAppNotification = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["AppNotification"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["AppNotification"].length; i++) {
        jsonStream.write(model["AppNotification"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM AppNotification").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`AppNotification b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`AppNotification a ${memoryDiff / (1024 * 1024)} MB`);
    // const result = await tableGetAll(`AppNotification`, req.query);
    // return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppNotification = async (req, res) => {
  try {
    const cond = req.params.id;
    const result = await getOneData(cond, "AppNotification");
    // const cond = req.params.id;
    // const result = await tableGetSingle(`AppNotification`, cond);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAppNotification = async (req, res) => {
  try {
    const result = await addData(
      req.body,
      "AppNotification",
      AppNotificationSchema
    );
    // const result = await tableInsertData(req.body, `AppNotification`);
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAppNotification = async (req, res) => {
  try {
    const targetColVal = req.params.id;
    const result = await updateData(
      req.body,
      targetColVal,
      "AppNotification",
      AppNotificationSchema
    );
    // const targetColVal = Object.values(req.params)[0];
    // const result = await tableUpdateData(
    //   req.body,
    //   `AppNotification`,
    //   targetColVal
    // );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAppNotification = async (req, res) => {
  try {
    const targetColVal = req.params.id;
    const result = await deleteData(targetColVal, "AppNotification");
    // const targetColVal = Object.values(req.params)[0];
    // const result = await tableDeleteData(`AppNotification`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAppNotification,
  getAppNotification,
  addAppNotification,
  updateAppNotification,
  deleteAppNotification,
};
