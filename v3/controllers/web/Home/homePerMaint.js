const JSONStream = require("JSONStream");

// const { cache } = require("../../../services/web/Cache/cache");
const { model } = require("../../../model/mainModel");
const { getData } = require("../../../helpers/getData");

const convertToObject = (str) => {
  const parts = str
    .split(/(?=\([A-Z]+\d+\))/g)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  let result = {};
  parts.forEach((item) => {
    const splitted = item.split("=>");
    const cat = splitted[0].trim().split("(").join("").split(")").join("");
    const tasks = splitted[1];
    if (!result[cat]) result[cat] = {};
    const groupTask = tasks.split(",");
    groupTask.forEach((gTask) => {
      const splittedTaskCat = gTask.split("_");
      const taskCat = splittedTaskCat[0].trim();
      const task = splittedTaskCat[1];
      if (!result[cat][taskCat]) result[cat][taskCat] = {};
      if (!result[cat][taskCat].Task) result[cat][taskCat].Task = [];
      result[cat][taskCat].Task.push(task);
    });
  });

  return result;
};

const perMaintEqs = ["MC", "BC", "BG"];
const intervals = ["250", "1000", "2000"];
const matches = [
  { test: "250", value: 250 },
  { test: "1000", value: 1000 },
  { test: "2000", value: 2000 },
];

const calculatePerMaintIterval = () => {
  const result = [];
  let eqsHis = {};
  let eqsHisDiesel = {};
  model["Maintenance"]
    ?.sort((a, b) => new Date(a?.Date_Time) - new Date(b?.Date_Time))
    ?.forEach((row) => {
      let actions = {};
      const cond = perMaintEqs?.some((prefix) =>
        row.Equipment.startsWith(prefix)
      );
      if (row?.Breakdown_Type === "Periodic Maintenance") {
        if (cond) {
          //   const intCond = intervals?.some((prefix) =>
          //     row?.Problem?.includes(prefix)
          //   );
          if (row?.Action?.includes("=>")) {
            actions = convertToObject(row?.Action);
            // console.log(actions);
          } else if (row?.Action?.startsWith("{")) {
            actions = JSON.parse(row?.Action);
          }

          //   if (Object.keys(actions)?.includes("Diesel")) {
          //     eqsHisDiesel[row?.Equipment] = {
          //       Date: row?.Date_Time,
          //       WH: row?.Working_Hours,
          //       interval: 300,
          //     };
          //   }

          Object.keys(actions)?.forEach((item) => {
            if (
              Object.keys(actions[item])?.some((prefix) =>
                prefix.includes("Diesel")
              )
            ) {
              eqsHisDiesel[row?.Equipment] = {
                Date: row?.Date_Time,
                WH: row?.Working_Hours,
                interval: 300,
              };
            }
          });

          if (
            (Object.keys(actions)?.includes("Diesel") &&
              Object.keys(actions)?.length > 1) ||
            !Object.keys(actions)?.includes("Diesel")
          ) {
            if (row?.Problem?.includes("1000")) {
              eqsHis[row?.Equipment] = {
                Date: row?.Date_Time,
                WH: row?.Working_Hours,
                interval: matches.find((m) => row?.Problem?.includes(m.test))
                  ?.value,
                lastKnown: 1000,
                lastKnownWH: row?.Working_Hours,
              };
            } else if (row?.Problem?.includes("2000")) {
              eqsHis[row?.Equipment] = {
                Date: row?.Date_Time,
                WH: row?.Working_Hours,
                interval: matches.find((m) => row?.Problem?.includes(m.test))
                  ?.value,
                lastKnown: 2000,
                lastKnownWH: row?.Working_Hours,
              };
            } else {
              eqsHis[row?.Equipment] = {
                Date: row?.Date_Time,
                WH: row?.Working_Hours,
                interval: matches.find((m) => row?.Problem?.includes(m.test))
                  ?.value,
                lastKnown: eqsHis[row?.Equipment]?.lastKnown || null,
                lastKnownWH: eqsHis[row?.Equipment]?.lastKnownWH || null,
              };
            }
          }
        } else {
          eqsHisDiesel[row?.Equipment] = {
            Date: row?.Date_Time,
            WH: row?.Working_Hours,
            interval: 300,
          };
        }
      }
    });

  Object.keys(eqsHis)?.map((item) => {
    result.push({
      Equipment: item,
      Date: eqsHis[item]?.Date,
      WH: eqsHis[item]?.WH,
      interval: eqsHis[item]?.interval,
      Type: "",
      lastKnown: eqsHis[item]?.lastKnown,
      lastKnownWH: eqsHis[item]?.lastKnownWH,
    });
  });
  Object.keys(eqsHisDiesel)?.map((item) => {
    result.push({
      Equipment: item,
      Date: eqsHisDiesel[item]?.Date,
      WH: eqsHisDiesel[item]?.WH,
      interval: eqsHisDiesel[item]?.interval,
      Type: "Diesel",
    });
  });
  return result;
};

const HomePerMaint = (req, res) => {
  try {
    const body = req.body;

    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Maintenance"]) {
      const result = calculatePerMaintIterval();
      const now = new Date();
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        // const currentDate = new Date(item["Date_Time"]);

        // if (
        //   currentDate >= lastMonth &&
        //   currentDate <= now &&
        //   body?.Sites?.map((site) => site?.name).includes(item.Location)
        // )
        jsonStream.write(item);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Maintenance").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`HomeMaintenance b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`HomeMaintenance a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { HomePerMaint };
