const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const { model } = require("../../../model/mainModel");

const JSONStream = require("JSONStream");

const getTasks = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    // const query = `SELECT * FROM TaskManagerTasks`;
    // const data = (await getData(query)).recordsets[0];
    if (model["TaskManagerTasks"]) {
      // Push the large JSON object into the JSONStream serializer
      model["TaskManagerTasks"].forEach((item) => {
        jsonStream.write(item);
      });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM TaskManagerTasks").then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }
    // getAllData("TaskManagerTasks").then((data) => {
    //   data.forEach((item) => {
    //     jsonStream.write(item);
    //   });

    //   // End the JSONStream serializer
    //   jsonStream.end();
    // });

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`TaskManagerTasks b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`TaskManagerTasks a ${memoryDiff / (1024 * 1024)} MB`);

    // return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks };
