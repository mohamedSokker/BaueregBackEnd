// const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const JSONStream = require("JSONStream");

const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const getUsersSites = async (req, res) => {
  try {
    const fieldsData = req.body;
    // const query = `SELECT
    // Equipments_Location.Location,
    // Equipments_Location.Equipment_Type,
    // Bauer_Equipments.Equipment_Model,
    // Equipments_Location.Equipment
    // FROM Equipments_Location
    // JOIN Bauer_Equipments
    // ON (Equipments_Location.Equipment = Bauer_Equipments.Equipment)
    // WHERE Equipments_Location.End_Date IS NULL`;
    // const usersQuery = `SELECT Top 1
    // Locations FROM Users
    // WHERE UserName = '${fieldsData?.username}'`;
    // const result = await getData(`${query} ${usersQuery}`);
    // const sitesResult = result?.recordsets[0];
    // const usersResult = result.recordsets[1];

    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    // let allSitesEqs = [];

    if (model["AdminUsersApp"]) {
      if (
        JSON.parse(
          model["AdminUsersApp"].find(
            (user) => user.UserName === fieldsData?.username
          )?.UserRole
        ).Admin
      ) {
        if (model["Equipments_Location"]) {
          model["Equipments_Location"]
            .filter((item) => item.End_Date === null)
            .forEach((result) => {
              jsonStream.write(result.Location);
            });

          // End the JSONStream serializer
          jsonStream.end();
        } else {
          const query = `SELECT * FROM Equipments_Location WHERE End_Date IS NULL`;
          getData(query).then((result) => {
            result.recordsets[0].forEach((item) => {
              jsonStream.write(item.Location);
            });

            // End the JSONStream serializer
            jsonStream.end();
          });
        }
      } else {
        JSON.parse(
          model["AdminUsersApp"].find(
            (user) => user.UserName === fieldsData?.username
          )?.UserRole
        )?.Editor?.DataEntrySites.forEach((site) => {
          jsonStream.write(site.name);
        });

        // End the JSONStream serializer
        jsonStream.end();
      }
    } else {
      const query = `SELECT * FROM AdminUsersApp`;
      getData(query).then((users) => {
        if (
          JSON.parse(
            users.recordsets[0].find(
              (user) => user.UserName === fieldsData?.username
            )?.UserRole
          ).Admin
        ) {
          if (model["Equipments_Location"]) {
            model["Equipments_Location"]
              .filter((item) => item.End_Date === null)
              .forEach((result) => {
                jsonStream.write(result.Location);
              });

            // End the JSONStream serializer
            jsonStream.end();
          } else {
            const query = `SELECT * FROM Equipments_Location WHERE End_Date IS NULL`;
            getData(query).then((result) => {
              result.recordsets[0].forEach((item) => {
                jsonStream.write(item.Location);
              });

              // End the JSONStream serializer
              jsonStream.end();
            });
          }
        } else {
          JSON.parse(
            users.recordsets[0].find(
              (user) => user.UserName === fieldsData?.username
            )?.UserRole
          )?.Editor?.DataEntrySites.forEach((site) => {
            jsonStream.write(site.name);
          });
          // End the JSONStream serializer
          jsonStream.end();
        }
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`getUsersSites b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`getUsersSites a ${memoryDiff / (1024 * 1024)} MB`);

    // const allEqsLoc = await getAllData("Equipments_Location");
    // const allEqs = await getAllData("Bauer_Equipments");
    // const allUsers = await getAllData("AdminUsersApp");
    // const allBreakdownTypes = await getAllData("Bauer_Breakdown");

    // const targetEqsLoc = allEqsLoc.filter((eq) => eq.End_Date === null);

    // let allSitesEqs = [];
    // targetEqsLoc.map((item) => {
    //   const eqModel = allEqs.find((eq) => eq.Equipment === item.Equipment);
    //   allSitesEqs.push({ ...item, Equipment_Model: eqModel?.Equipment_Model });
    // });

    // const targetUser = allUsers.find(
    //   (user) => user.UserName === fieldsData?.username
    // );

    // console.log(targetUser);

    // const targetRole = JSON.parse(targetUser?.UserRole);

    // let targetSites = [];
    // if (targetRole.Admin) {
    //   targetEqsLoc.map((item) => {
    //     targetSites.push(item.Location);
    //   });
    // } else {
    //   targetRole?.Editor?.DataEntrySites.map((site) => {
    //     targetSites.push(site.name);
    //   });
    // }

    // // const targetSites = targetRole?.Editor?.DataEntrySites;

    // const sitesResult = allSitesEqs;
    // const usersResult = targetSites.join(",");

    // // console.log(sitesResult);
    // console.log(targetSites);
    // console.log(usersResult);

    // if (!targetSites) throw new Error(`No Users Found`);

    // return res
    //   .status(200)
    //   .json({ sitesResult, usersResult, allBreakdownTypes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsersSites };
