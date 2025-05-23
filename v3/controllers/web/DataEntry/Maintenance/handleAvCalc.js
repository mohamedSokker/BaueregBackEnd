const formatDate = require("../../../../helpers/formatdate");
const addDays = require("../../../../helpers/addDays");
const dateDiffDays = require("../../../../helpers/dateDiff");
const dateDiffMin = require("../../../../helpers/dateDiffMin");
const getDayName = require("../../../../helpers/getDayName");
// const { getAllDataYard } = require("../../../services/mainServiceYard");
const {
  // getAllData,
  addData,
  updateData,
  addMany,
  updateMany,
} = require("../../../../services/mainService");
const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const { MaintenanceSchema } = require("../../../../schemas/Maintenance/schema");
const {
  AvailabilitySchema,
} = require("../../../../schemas/Availability/schema");
const {
  Maintenance_StocksSchema,
} = require("../../../../schemas/Maintenance_Stocks/schema");
const { QCTableSchema } = require("../../../../schemas/QCTable/schema");

const LeadTime = 1;
const safetyStock = 1;

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
    let newStartDate = new Date(data?.Problem_start_From).toISOString();
    let newEndDate = new Date(data?.Problem_End_To).toISOString();
    if (dateDiffDays(data?.Problem_End_To, data?.Problem_start_From) > 0) {
      if (formatDate(startDate) === formatDate(data?.Problem_start_From)) {
        newStartDate = new Date(data?.Problem_start_From).toISOString();
        newEndDate = new Date(
          getDate(`${formatDate(addDays(startDate, 1))} 00:00:00`)
        );
      } else if (formatDate(startDate) === formatDate(data?.Problem_End_To)) {
        newStartDate = new Date(getDate(`${formatDate(startDate)} 00:00:00`));
        newEndDate = new Date(data?.Problem_End_To).toISOString();
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

const getMaintenanceStock = async (fieldsData) => {
  const sparePartQuantity =
    fieldsData?.Spare_part !== "" ? fieldsData?.Spare_part : null;
  const sparePartQuantityArray = sparePartQuantity?.split(",");
  //   console.log(sparePartQuantityArray);

  //  allMaintStocks = await getAllData("Maintenance_Stocks");

  // const sparePartArray = [];
  // const QuantityArray = [];
  const sparePartdata = [];
  sparePartQuantityArray?.map(async (data) => {
    const sparePart = data?.split("(");
    const Quantity = sparePart && sparePart[1]?.split(")");

    let targetMaintStocks = [];
    if (model["Maintenance_Stocks"]) {
      model["Maintenance_Stocks"].sort((a, b) => a.DateTime - b.DateTime);
      targetMaintStocks = model["Maintenance_Stocks"].filter(
        (item) => item.SparePart_Code === sparePart[0]?.trim()
      );
    } else {
      const query = `SELECT * FROM Maintenance_Stocks WHERE SparePart_Code = '${sparePart[0]?.trim()}' ORDER BY DateTime ASC`;
      targetMaintStocks = (await getData(query)).recordsets[0];
    }

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
          // console.log(history[item?.SparePart_Code]);
          if (currentCons > maxCons) maxCons = currentCons;
        } else {
          history = {
            ...history,
            [item?.SparePart_Code]: {
              ...history[item.SparePart_Code],
              [item.Equipment]: { currentWH: item.Working_Hours },
            },
          };
          // console.log(history[item?.SparePart_Code]);
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
      Problem_start_From: new Date(
        fieldsData?.Problem_start_From
      ).toISOString(),
      Problem_End_To: new Date(fieldsData?.Problem_End_To).toISOString(),
      Breakdown_Type: fieldsData?.Breakdown_Type,
    });

    // console.log(maintenanceData[maintenanceData.length - 1]);

    const sparePart = await getMaintenanceStock(fieldsData);

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

    const maintResult = {
      Date_Time: formatDate(fieldsData.Problem_start_From),
      Location: fieldsData.Location,
      Equipment_Type: fieldsData.Equipment_Type,
      Equipment_Model: fieldsData.Equipment_Model,
      Equipment: fieldsData.Equipment,
      Working_Hours: fieldsData.Working_Hours,
      Breakdown_Type: fieldsData.Breakdown_Type,
      Problem: fieldsData.Problem,
      Action: fieldsData.Action,
      Problem_start_From: fieldsData.Problem_start_From,
      Problem_End_To: fieldsData.Problem_End_To,
      Breakdown_time: (
        dateDiffMin(fieldsData.Problem_End_To, fieldsData.Problem_start_From) /
        60
      ).toFixed(1),
      Site_QC_Min: fieldsData.Site_QC_Min,
      Spare_part: fieldsData.Spare_part,
    };

    await addData(maintResult, "Maintenance", MaintenanceSchema);
    if (sparePart.length > 0)
      await addMany(sparePart, "Maintenance_Stocks", Maintenance_StocksSchema);
    if (avResult.length > 0)
      await updateMany(avResult, "Availability", AvailabilitySchema);

    await updateData(
      { Sent: "true" },
      fieldsData?.ID,
      "QCTable",
      QCTableSchema
    );

    // console.log(maintResult);
    // // console.log(data);
    // console.log(sparePart);
    // console.log(avResult);

    // return { maintResult, sparePart, avResult };

    // return res.status(200).json(data, sparePart, avResult, fieldsData);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
    // return res.status(500).json({ message: error.message });
  }
};

const addMaintenance = async (req, res) => {
  try {
    // console.log(req.body);
    model["Maintenance"].sort((a, b) => a.Date_Time - b.Date_Time);
    // let maintData = [];
    // model["Maintenance"].map((item) => {
    //   maintData.push({
    //     ...item,
    //     Date_Time: formatDate(item.Date_Time),
    //     Problem_start_From: new Date(item.Problem_start_From).toISOString(),
    //     Problem_End_To: new Date(item.Problem_End_To).toISOString(),
    //     Working_Hours: Number(item.Working_Hours).toFixed(0),
    //   });
    // });

    model["Availability_Plan"].sort((a, b) => a.DateFrom - b.DateFrom);

    model["Availability"].sort((a, b) => a.Date_Time - b.Date_Time);

    //   const targetMaint = maintData.filter(
    //     (item) =>
    //       new Date(formatDate(item.Date_Time)) >= new Date("2022-05-29") &&
    //       dateDiffDays(item.Problem_End_To, item.Problem_start_From) > 0
    //   );
    const targetMaint = req.body;
    console.log(`Data length: ${targetMaint.length}`);

    // let result = [];

    for (let i = 0; i < targetMaint.length; i++) {
      console.log(
        `loading ${(((i + 1) / targetMaint.length) * 100).toFixed(
          2
        )} % at row ${i} / ${targetMaint.length}`
      );
      await handleAvCalc(
        targetMaint[i],
        model["Maintenance"],
        model["Availability_Plan"],
        model["Availability"]
      );
      // result.push(response);
    }
    console.log(`Finished`);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addMaintenance };
