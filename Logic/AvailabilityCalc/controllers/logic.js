const { getData } = require("../../../functions/getData");
const formatDate = require("../../globalFunction/formatdate");
const addDays = require("../../../Logic/globalFunction/addDays");
const dateDiffDays = require("../../../Logic/globalFunction/dateDiff");
const dateDiffMin = require("../../../Logic/globalFunction/dateDiffMin");
const getDayName = require("../../globalFunction/getDayName");

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

const getQueriesData = async (fieldsData) => {
  try {
    const maintenanceQuery = `SELECT * FROM Maintenance WHERE (Problem_start_From 
                   BETWEEN '${formatDate(fieldsData.Problem_start_From)}' 
                   AND '${formatDate(addDays(fieldsData.Problem_End_To, 1))}' OR
                   Problem_End_To 
                   BETWEEN '${fieldsData.Problem_start_From}' AND 
                   '${fieldsData.Problem_End_To}') AND
                   Location = '${fieldsData.Location}' AND Equipment = '${
      fieldsData.Equipment
    }'
                   ORDER BY Date_Time ASC`;
    const avPlanQuery = `SELECT * FROM Availability_Plan WHERE
                   ('${formatDate(
                     fieldsData.Problem_start_From
                   )}' BETWEEN DateFrom AND DateTo OR
                   '${formatDate(
                     fieldsData.Problem_End_To
                   )}' BETWEEN DateFrom AND DateTo) AND
                   Location = '${fieldsData.Location}'`;
    const avQuery = `SELECT * FROM Availability WHERE
                     Date_Time BETWEEN '${formatDate(
                       fieldsData.Problem_start_From
                     )}' 
                     AND '${formatDate(fieldsData.Problem_End_To)}' AND
                     Location = '${fieldsData.Location}' 
                     AND Equipment = '${
                       fieldsData.Equipment
                     }' ORDER BY Date_Time ASC`;
    const result = await getData(
      `${maintenanceQuery} ${avPlanQuery} ${avQuery}`
    );
    return result;
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
        new Date(getDate(startDate)) >=
          new Date(getDate(`${formatDate(data?.DateFrom)} 00:00:00`)) &&
        new Date(getDate(startDate)) <=
          new Date(getDate(`${formatDate(data?.DateTo)} 23:59:59`))
      ) {
        startFlag = true;
      }

      if (
        new Date(getDate(endDate)) >=
          new Date(getDate(`${formatDate(data?.DateFrom)} 00:00:00`)) &&
        new Date(getDate(endDate)) <=
          new Date(getDate(`${formatDate(data?.DateTo)} 23:59:59`))
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
    const newData = maintenanceData?.filter(
      (data) =>
        formatDate(startDate) === formatDate(data?.Problem_start_From) ||
        formatDate(startDate) === formatDate(data?.Problem_End_To) ||
        (new Date(getDate(startDate)) >= new Date(data?.Problem_start_From) &&
          new Date(getDate(startDate)) <= new Date(data?.Problem_End_To))
    );
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
  avPlanData
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
        newStartDate = new Date(getDate(startDate));
        newEndDate = new Date(data?.Problem_End_To);
      } else {
        newStartDate = new Date(getDate(startDate));
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
      new Date(getDate(startDate)) >= data?.DateFrom &&
      new Date(getDate(startDate)) <= data?.DateTo
  );

  const dayName = getDayName(new Date(getDate(startDate)));
  const targetInterval = Number(targetIntervalData[dayName]);

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

  const avPerc = avCalc(targetInterval, perMaintTime, breakdownTime);

  return { breakdownTime, perMaintTime, avPerc };
};

const getMaintenanceStock = async (fieldsData) => {
  const sparePartQuantity = fieldsData?.Spare_part;
  const sparePartQuantityArray = sparePartQuantity?.split(",");
  // const sparePartArray = [];
  // const QuantityArray = [];
  const sparePartdata = [];
  sparePartQuantityArray?.map((data) => {
    const sparePart = data?.split("(");
    // sparePart && sparePartArray.push(sparePart[0]?.trim());
    const Quantity = sparePart && sparePart[1].split(")");
    sparePartdata.push({
      sparePart: sparePart[0]?.trim(),
      Quantity: Quantity[0],
    });
    // QuantityArray.push(Quantity[0]);
  });
  return sparePartdata;
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;

    const result = await getQueriesData(fieldsData);

    const maintenanceData = result.recordsets[0];
    const avPlanData = result.recordsets[1];
    const avData = result.recordsets[2];
    let startDate = `${formatDate(fieldsData.Problem_start_From)} 00:00:00`;
    let endDate = fieldsData.Problem_End_To;
    let perMaintTime = 0;
    let breakdownTime = 0;
    let data = [];

    await checkIfAvPlan(avPlanData, startDate, endDate);

    maintenanceData.push({
      Problem_start_From: new Date(getDate(fieldsData?.Problem_start_From)),
      Problem_End_To: new Date(getDate(fieldsData?.Problem_End_To)),
      Breakdown_Type: fieldsData?.Breakdown_Type,
    });

    const sparePart = await getMaintenanceStock(fieldsData);
    console.log(sparePart);

    // console.log(maintenanceData);

    while (new Date(startDate) <= new Date(endDate)) {
      perMaintTime = 0;
      breakdownTime = 0;

      const newData = await getMaintenanceDataCurrentDate(
        maintenanceData,
        startDate
      );

      const breakTime = await getBreakdownTime(
        newData,
        startDate,
        breakdownTime,
        perMaintTime,
        avPlanData
      );

      data.push({
        dateTime: formatDate(startDate),
        perMaintTime: breakTime?.perMaintTime,
        breakdownTime: breakTime?.breakdownTime,
        avPerc: breakTime?.avPerc,
      });
      startDate = addDays(startDate, 1).toLocaleString();
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
