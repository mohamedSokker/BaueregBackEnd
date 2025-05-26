const JSONStream = require("JSONStream");

// const { cache } = require("../../../services/web/Cache/cache");
const { model } = require("../../../model/mainModel");

const CACHE_TABLES = [
  "Maintenance",
  "FuelConsumption",
  "Consumptions",
  "OilConsumption",
  "Production_Piles",
  "Production_TrenchCutting",
  "ProductionGrouting",
  "DailyWH",
  "Test",
];

const CACHE_LOCATIONS = [
  "Equipments_Location",
  "Machinary_Location",
  "Wire",
  "Location_GearboxTrench",
  "Location_GearboxDrilling",
  "Location_Mudpump",
  "Locations_Kelly",
  "Location_DieselMotor",
  "Location_TravelingGearbox",
];

const CACHE_TABLES_WITH_DATE = {
  Maintenance: "Date_Time",
  FuelConsumption: "Date",
  Consumptions: "Date",
  OilConsumption: "Date",
  Production_Piles: "Date",
  Production_TrenchCutting: "Date",
  ProductionGrouting: "Date",
  Test: "Date",
  DailyWH: "Date",
};

const CACHE_LOCATIONS_WITH_DATE = {
  Equipments_Location: "End_Date",
  Machinary_Location: "End_Date",
  Wire: "End_Date",
  Location_GearboxTrench: "EndDate",
  Location_GearboxDrilling: "EndDate",
  Location_Mudpump: "EndDate",
  Locations_Kelly: "EndDate",
  Location_DieselMotor: "EndDate",
  Location_TravelingGearbox: "EndDAte",
};

function filterCacheLastMonth(cache, sitesArray) {
  const now = new Date();
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const filteredCache = {};

  for (const tableName in cache) {
    if (cache.hasOwnProperty(tableName) && CACHE_TABLES.includes(tableName)) {
      const filteredArray = cache[tableName].filter((item) => {
        const currentDate = new Date(item[CACHE_TABLES_WITH_DATE[tableName]]);
        return (
          currentDate >= lastMonth &&
          currentDate <= now &&
          sitesArray?.map((item) => item?.name).includes(item.Location)
        );
      });

      if (filteredArray.length > 0) {
        filteredCache[tableName] = filteredArray;
      }
    }

    if (
      cache.hasOwnProperty(tableName) &&
      CACHE_LOCATIONS.includes(tableName)
    ) {
      const filteredArray = cache[tableName].filter((item) => {
        // const currentDate = new Date(
        //   item[CACHE_LOCATIONS_WITH_DATE[tableName]]
        // );
        return item[CACHE_LOCATIONS_WITH_DATE[tableName]] === null;
      });

      if (filteredArray.length > 0) {
        filteredCache[tableName] = filteredArray;
      }
    }
  }

  //   console.log("Filtered Cache:", filteredCache);

  return filteredCache;
}

const home = (req, res) => {
  try {
    const body = req.body;

    // const memoryUsageBefore = process.memoryUsage().rss;

    // const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // jsonStream.pipe(res);

    const filteredCache = filterCacheLastMonth(model, body.Sites);
    return res.status(200).json({ data: filteredCache });

    // const memoryUsageAfter = process.memoryUsage().rss;
    // const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    // console.log(`Home b ${memoryUsageBefore / (1024 * 1024)} MB`);
    // console.log(`Home a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { home };
