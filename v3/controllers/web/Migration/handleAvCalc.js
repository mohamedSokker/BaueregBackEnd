const sql = require("mssql");

const config = require("../../../config/config");

// const { getData } = require("../../../../helpers/getData");
const formatDate = require("../../../helpers/formatdate");
const addDays = require("../../../helpers/addDays");
const dateDiffDays = require("../../../helpers/dateDiff");
const dateDiffMin = require("../../../helpers/dateDiffMin");
const getDayName = require("../../../helpers/getDayName");
// const { getAllDataYard } = require("../../../services/mainServiceYard");
const {
  getAllData,
  addData,
  updateData,
  addMany,
  updateMany,
  updateManyQuery,
} = require("../../../services/mainService");

const { MaintenanceSchema } = require("../../../schemas/Maintenance/schema");
const { AvailabilitySchema } = require("../../../schemas/Availability/schema");
const {
  Maintenance_StocksSchema,
} = require("../../../schemas/Maintenance_Stocks/schema");

const LeadTime = 1;
const safetyStock = 1;

async function performQuery(pool, table, query) {
  console.log(`Peforming Query: ${query}`);
  return pool
    .request()
    .query(query)
    .then((result) => {
      const memoryUsage = process.memoryUsage().rss;
      console.log(` ${memoryUsage / (1024 * 1024)} MB`);
      return result;
    })
    .catch((err) => {
      console.error(`Error Peforming Query On table: ${table}`, err);
    });
}

const avCalc = (avTime, PerMaintTime, BreakdownTime) => {
  return (
    (Number(avTime) - Number(PerMaintTime) - Number(BreakdownTime)) /
    (Number(avTime) - Number(PerMaintTime))
  ).toFixed(2);
};

const getDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString();
};

const getQueriesData = async (fieldsData, allMaint, allAvPlan, allAv) => {
  try {
    allMaint.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));
    const targetMaintData = allMaint.filter(
      (item) =>
        item.Location === fieldsData.Location &&
        item.Equipment === fieldsData.Equipment
    );

    const targetAvPlanData = allAvPlan.filter((item) => {
      return (
        ((new Date(formatDate(fieldsData.Problem_start_From)) >=
          new Date(formatDate(item.DateFrom)) &&
          new Date(formatDate(fieldsData.Problem_start_From)) <=
            new Date(formatDate(item.DateTo))) ||
          (new Date(formatDate(fieldsData.Problem_End_To)) >=
            new Date(formatDate(item.DateFrom)) &&
            new Date(formatDate(fieldsData.Problem_End_To)) <=
              new Date(formatDate(item.DateTo)))) &&
        item.Location === fieldsData.Location
      );
    });

    allAv.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));
    const targetAvData = allAv.filter(
      (item) =>
        new Date(formatDate(item.Date_Time)) >=
          new Date(formatDate(fieldsData.Problem_start_From)) &&
        new Date(formatDate(item.Date_Time)) <=
          new Date(formatDate(fieldsData.Problem_End_To)) &&
        item.Location === fieldsData.Location &&
        item.Equipment === fieldsData.Equipment
    );

    return { targetMaintData, targetAvPlanData, targetAvData };
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkIfAvPlan = async (avPlanData, startDate, endDate) => {
  try {
    let startFlag = false;
    let endFlag = false;

    avPlanData.map((data) => {
      if (
        new Date(formatDate(startDate)) >=
          new Date(formatDate(data?.DateFrom)) &&
        new Date(formatDate(startDate)) <= new Date(formatDate(data?.DateTo))
      ) {
        startFlag = true;
      }

      if (
        new Date(formatDate(endDate)) >= new Date(formatDate(data?.DateFrom)) &&
        new Date(formatDate(endDate)) <= new Date(formatDate(data?.DateTo))
      ) {
        endFlag = true;
      }
    });

    if (!startFlag || !endFlag) throw new Error(`No Week Plan`);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMaintenanceDataCurrentDate = async (maintenanceData, startDate) => {
  try {
    const newData = maintenanceData?.filter((data) => {
      return (
        new Date(formatDate(startDate)) ===
          new Date(formatDate(data?.Problem_start_From)) ||
        new Date(formatDate(startDate)) ===
          new Date(formatDate(data?.Problem_End_To)) ||
        (new Date(formatDate(startDate)) >=
          new Date(formatDate(data?.Problem_start_From)) &&
          new Date(formatDate(startDate)) <=
            new Date(formatDate(data?.Problem_End_To)))
      );
    });
    return newData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBreakdownTime = async (
  newData,
  startDate,
  breakdownTime,
  perMaintTime,
  siteQcTime,
  avPlanData,
  dateDiff
) => {
  newData?.map((data) => {
    let newStartDate = new Date(data?.Problem_start_From);
    let newEndDate = new Date(data?.Problem_End_To);
    if (dateDiffDays(data?.Problem_End_To, data?.Problem_start_From) > 0) {
      if (formatDate(startDate) === formatDate(data?.Problem_start_From)) {
        newStartDate = new Date(data?.Problem_start_From);
        newEndDate = new Date(
          getDate(`${formatDate(addDays(startDate, 1))} 00:00:00`)
        );
      } else if (formatDate(startDate) === formatDate(data?.Problem_End_To)) {
        newStartDate = new Date(getDate(`${formatDate(startDate)} 00:00:00`));
        newEndDate = new Date(data?.Problem_End_To);
      } else {
        newStartDate = new Date(getDate(`${formatDate(startDate)} 00:00:00`));
        newEndDate = new Date(
          getDate(`${formatDate(addDays(startDate, 1))} 00:00:00`)
        );
      }
    }

    if (data?.Breakdown_Type === "Periodic Maintenance") {
      perMaintTime += dateDiffMin(newEndDate, newStartDate);
      return perMaintTime;
    } else {
      breakdownTime += dateDiffMin(newEndDate, newStartDate);
      return breakdownTime;
    }
  });

  const targetIntervalData = avPlanData.find(
    (data) =>
      new Date(formatDate(startDate)) >= new Date(formatDate(data?.DateFrom)) &&
      new Date(formatDate(startDate)) <= new Date(formatDate(data?.DateTo))
  );

  const dayName = getDayName(new Date(startDate));
  const targetInterval =
    targetIntervalData && targetIntervalData[dayName]
      ? Number(targetIntervalData[dayName])
      : 1440;

  if (perMaintTime > targetInterval) {
    perMaintTime = targetInterval;
  }
  if (breakdownTime > targetInterval) {
    breakdownTime = targetInterval;
  }

  if (perMaintTime + breakdownTime > targetInterval) {
    if (breakdownTime > perMaintTime) {
      breakdownTime = targetInterval - perMaintTime;
    } else {
      perMaintTime = targetInterval - breakdownTime;
    }
  }

  const avTime = targetInterval - perMaintTime - breakdownTime;

  const MaintAv = avCalc(targetInterval, perMaintTime, breakdownTime);
  const SiteAv = avCalc(
    targetInterval,
    perMaintTime,
    dateDiff > 0 ? siteQcTime / dateDiff : siteQcTime
  );

  return { avTime, breakdownTime, perMaintTime, MaintAv, SiteAv };
};

const getMaintenanceStock = async (fieldsData, allMaint) => {
  const sparePartQuantity =
    fieldsData?.Spare_part !== "" ? fieldsData?.Spare_part : null;
  const sparePartQuantityArray = sparePartQuantity?.split(",");
  //   console.log(sparePartQuantityArray);

  const allMaintStocks = await getAllData("Maintenance_Stocks");
  allMaintStocks.sort((a, b) => a.DateTime - b.DateTime);

  // const sparePartArray = [];
  // const QuantityArray = [];
  const sparePartdata = [];
  sparePartQuantityArray?.map((data) => {
    const sparePart = data?.split("(");
    const Quantity = sparePart && sparePart[1]?.split(")");

    const targetMaintStocks = allMaintStocks.filter(
      (item) => item.SparePart_Code === sparePart[0]?.trim()
    );

    if (
      sparePart[0]?.trim() &&
      Quantity &&
      Quantity[0] &&
      Quantity.length === 2 &&
      Quantity[1]
    ) {
      targetMaintStocks.push({
        DateTime: formatDate(fieldsData.Problem_start_From),
        Location: fieldsData?.Location,
        Equipment_Type: fieldsData?.Equipment_Type,
        Equipment_Model: fieldsData?.Equipment_Model,
        Equipment: fieldsData?.Equipment,
        SparePart_Code: sparePart[0]?.trim(),
        SparePart_Quantity: Quantity && Quantity[0],
        Description: Quantity && Quantity.length === 2 && Quantity[1],
        Working_Hours: fieldsData.Working_Hours,
      });

      let totalQuantity = 0;
      let maxCons = 0;
      let totalWH = 0;

      let history = {};
      targetMaintStocks?.map((item) => {
        if (
          history[item?.SparePart_Code] &&
          history[item?.SparePart_Code][item.Equipment]
        ) {
          totalQuantity += Number(item.SparePart_Quantity);
          totalWH +=
            Number(item?.Working_Hours) -
            Number(history[item?.SparePart_Code][item.Equipment].currentWH);
          const WHDiff =
            Number(item.Working_Hours) -
            Number(history[item?.SparePart_Code][item.Equipment].currentWH);
          const currentCons =
            WHDiff > 0 ? Number(item.SparePart_Quantity) / WHDiff : 20;
          history = {
            ...history,
            [item?.SparePart_Code]: {
              ...history[item.SparePart_Code],
              [item.Equipment]: { currentWH: item.Working_Hours },
            },
          };
          console.log(history[item?.SparePart_Code]);
          if (currentCons > maxCons) maxCons = currentCons;
        } else {
          history = {
            ...history,
            [item?.SparePart_Code]: {
              ...history[item.SparePart_Code],
              [item.Equipment]: { currentWH: item.Working_Hours },
            },
          };
          console.log(history[item?.SparePart_Code]);
        }
      });

      // console.log(totalQuantity, totalWH);

      const targetEqMaintStocks = targetMaintStocks.filter(
        (item) => item.Equipment === fieldsData.Equipment
      );

      const currentWH = fieldsData.Working_Hours;
      const lastWH =
        targetEqMaintStocks.length > 1
          ? targetEqMaintStocks[targetEqMaintStocks.length - 2]?.Working_Hours
          : 0;
      const lastDateChanged =
        targetEqMaintStocks.length > 1
          ? targetEqMaintStocks[targetEqMaintStocks.length - 2]?.DateTime
          : null;
      const Hours =
        lastWH && currentWH && Number(currentWH - lastWH) > 0
          ? Number(currentWH - lastWH)
          : 0;
      const AvaregeConsumption =
        totalWH > 0
          ? (
              Number(Number(totalQuantity) / Number(totalWH)) *
              (24 * 30)
            ).toFixed(2)
          : 0;
      const MaxConsumption = (maxCons * 24 * 30).toFixed(2);
      const MinQuantity = Math.ceil(AvaregeConsumption * LeadTime);
      const MaxQuantity = Math.ceil(MaxConsumption * LeadTime);
      // sparePart && sparePartArray.push(sparePart[0]?.trim());

      sparePartdata.push({
        DateTime: formatDate(fieldsData.Problem_start_From),
        Location: fieldsData?.Location,
        Equipment_Type: fieldsData?.Equipment_Type,
        Equipment_Model: fieldsData?.Equipment_Model,
        Equipment: fieldsData?.Equipment,
        SparePart_Code: sparePart[0]?.trim(),
        SparePart_Quantity: Quantity && Quantity[0],
        Description: Quantity && Quantity.length === 2 && Quantity[1],
        Working_Hours: currentWH,
        lastWH: lastWH,
        lastDateChanged: lastDateChanged && formatDate(lastDateChanged),
        Hours: Hours,
        AvaregeConsumption: AvaregeConsumption,
        MaxConsumption: MaxConsumption,
        MinQuantity: MinQuantity,
        MaxQuantity: MaxQuantity,
      });
    }

    // QuantityArray.push(Quantity[0]);
  });
  return sparePartdata;
};

const handleAvCalc = async (maintData, allMaint, allAvPlan, allAv) => {
  try {
    const fieldsData = maintData;

    const result = await getQueriesData(fieldsData, allMaint, allAvPlan, allAv);

    const maintenanceData = result.targetMaintData;
    const avPlanData = result.targetAvPlanData;
    const avData = result.targetAvData;
    let startDate = new Date(fieldsData.Problem_start_From);
    let endDate = new Date(fieldsData.Problem_End_To);
    const dateDiff = dateDiffDays(endDate, startDate);
    let perMaintTime = 0;
    let breakdownTime = 0;
    let data = [];

    await checkIfAvPlan(avPlanData, startDate, endDate);

    maintenanceData.push({
      Problem_start_From: new Date(fieldsData?.Problem_start_From),
      Problem_End_To: new Date(fieldsData?.Problem_End_To),
      Breakdown_Type: fieldsData?.Breakdown_Type,
    });

    // console.log(maintenanceData[maintenanceData.length - 1]);

    const sparePart = await getMaintenanceStock(fieldsData, allMaint);

    while (new Date(startDate) <= new Date(endDate)) {
      perMaintTime = 0;
      breakdownTime = 0;

      const newData = await getMaintenanceDataCurrentDate(
        maintenanceData,
        startDate
      );

      //   console.log(newData);

      const breakTime = await getBreakdownTime(
        newData,
        startDate,
        breakdownTime,
        perMaintTime,
        fieldsData.Site_QC_Min,
        avPlanData,
        dateDiff
      );

      //   console.log(breakTime);

      data.push({
        dateTime: formatDate(startDate),
        eq: fieldsData.Equipment,
        site: fieldsData.Location,
        perMaintTime: breakTime?.perMaintTime,
        breakdownTime: breakTime?.breakdownTime,
        AvTime: breakTime?.avTime,
        MaintAv: breakTime?.MaintAv,
        SiteAv: breakTime?.SiteAv,
      });
      startDate = addDays(startDate, 1);
    }

    let avResult = [];
    data.map((item) => {
      const targetAvItem = avData.find(
        (el) => formatDate(el.Date_Time) === formatDate(item.dateTime)
      );
      //   console.log(data);
      //   console.log(targetAvItem);
      if (
        (fieldsData.Equipment_Type === "Trench_Cutting_Machine" ||
          fieldsData.Equipment_Type === "Drilling_Machine") &&
        targetAvItem?.ID
      ) {
        avResult.push({
          ID: targetAvItem?.ID,
          Date_Time: item.dateTime,
          Equipment: fieldsData.Equipment,
          Location: fieldsData.Location,
          Periodic_Maintenance: item.perMaintTime,
          Breakdown_Time: item.breakdownTime,
          Available_Time: item.AvTime,
          Maintenance_Availability: item.MaintAv,
          Site_QC_Time: fieldsData.Site_QC_Min,
          Site_Availability: item.SiteAv,
          Maintenance_ID: null,
        });
      }
    });

    // await addData(fieldsData, "Maintenance", MaintenanceSchema);
    // if (sparePart.length > 0)
    //   await addMany(sparePart, "Maintenance_Stocks", Maintenance_StocksSchema);
    if (avResult.length > 0)
      return await updateManyQuery(
        avResult,
        "Availability",
        AvailabilitySchema
      );

    // console.log(avData);
    // console.log(data);
    // console.log(sparePart);
    // console.log(avResult);

    // return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: error.message });
  }
};

const migrateDate = async () => {
  sql.connect(config).then((pool) => {
    let promise = Promise.resolve();

    return (
      promise
        // .then(() => {
        //   // return performQuery(
        //   //   pool,
        //   //   "Availability",
        //   //   `DELETE FROM Availability WHERE Equipment = 'MC 128 #154'`
        //   // );
        // })
        .then(async () => {
          const allMaint = await getAllData("Maintenance");
          allMaint.sort((a, b) => a.Date_Time - b.Date_Time);
          let maintData = [];
          allMaint.map((item) => {
            maintData.push({
              ...item,
              Date_Time: formatDate(item.Date_Time),
              Problem_start_From: new Date(
                item.Problem_start_From
              ).toISOString(),
              Problem_End_To: new Date(item.Problem_End_To).toISOString(),
              Working_Hours: Number(item.Working_Hours).toFixed(0),
            });
          });

          const allAvPlan = await getAllData("Availability_Plan");
          allAvPlan.sort((a, b) => a.DateFrom - b.DateFrom);

          const allAv = await getAllData("Availability");
          allAv.sort((a, b) => a.Date_Time - b.Date_Time);

          const targetMaint = maintData.filter(
            (item) => item.Equipment === "MC 128 #154"
          );
          console.log(`Data length: ${targetMaint.length}`);

          targetMaint.forEach((item, i) => {
            promise = promise.then(async () => {
              console.log(
                `loading ${(((i + 1) / targetMaint.length) * 100).toFixed(2)} %`
              );
              return performQuery(
                pool,
                "Availability",
                await handleAvCalc(item, allMaint, allAvPlan, allAv)
              );
            });
          });
          return promise;
        })
        .then(() => {
          console.log("Finished");
          return pool.close(); // Close the connection pool
        })
    );
  });

  // for (let i = 0; i < targetMaint.length; i++) {
  //   console.log(
  //     `loading ${(((i + 1) / targetMaint.length) * 100).toFixed(
  //       2
  //     )} % at row ${i} / ${targetMaint.length}`
  //   );
  //   await handleAvCalc(targetMaint[i], allMaint, allAvPlan, allAv);
  // }
  // console.log(`Finished`);
};

module.exports = { migrateDate };
