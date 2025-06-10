// const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const JSONStream = require("JSONStream");

const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const getTargetTasks = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;
    const { reportID } = req.body;
    // const query = `SELECT * FROM TaskManagerTasks WHERE ReportID = '${reportID}'`;
    // const data = (await getData(query)).recordsets[0];
    // const allTasks = await getAllData("TaskManagerTasks");
    // const data = allTasks.filter((task) => task.ReportID === reportID);
    // return res.status(200).json(data);
    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["TaskManagerTasks"]) {
      // Push the large JSON object into the JSONStream serializer
      model["TaskManagerTasks"]
        .filter((task) => task.ReportID === reportID)
        .forEach((item) => {
          jsonStream.write(item);
        });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData(
        `SELECT * FROM TaskManagerTasks WHERE ReportID = '${reportID}'`
      ).then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`getTargetTasks b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`getTargetTasks a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetTasks };
