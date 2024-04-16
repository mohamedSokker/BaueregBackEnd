const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const { model } = require("../../../model/mainModel");

const JSONStream = require("JSONStream");

const getUsers = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);
    // const query = `SELECT * FROM AdminUsersApp WHERE Department = 'Maintenance' AND Title = 'Technicians'`;
    // const data = (await getData(query)).recordsets[0];
    if (model["AdminUsersApp"]) {
      // Push the large JSON object into the JSONStream serializer
      model["AdminUsersApp"]
        .filter(
          (user) =>
            user.Department === "Maintenance" && user.Title === "Technicians"
        )
        .forEach((item) => {
          jsonStream.write(item);
        });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData(
        "SELECT * FROM AdminUsersApp WHERE Department = 'Maintenance' AND Title = 'Technicians"
      ).then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }
    // getAllData("AdminUsersApp").then((data) => {
    //   data
    //     .filter(
    //       (user) =>
    //         user.Department === "Maintenance" && user.Title === "Technicians"
    //     )
    //     .forEach((item) => {
    //       jsonStream.write(item);
    //     });

    //   // End the JSONStream serializer
    //   jsonStream.end();
    // });

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`getUsers b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`getUsers a ${memoryDiff / (1024 * 1024)} MB`);
    // const data = allUsers.filter(
    //   (user) =>
    //     user.Department === "Maintenance" && user.Title === "Technicians"
    // );
    // return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers };
