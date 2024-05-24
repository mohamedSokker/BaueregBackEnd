const { getData } = require("../../../../v3/helpers/getData");
const { getAllDataYard } = require("../../../services/mainServiceYard");
const {
  addData,
  updateData,
  addMany,
  updateMany,
} = require("../../../services/mainService");
const {
  Availability_PlanSchema,
} = require("../../../schemas/Availability_Plan/schema");
const { AvailabilitySchema } = require("../../../schemas/Availability/schema");
const getEqsInSite = require("../../../helpers/getEquipmentsinSite");
const formatDate = require("../../../helpers/formatdate");
const getDayName = require("../../../helpers/getDayName");
const addDays = require("../../../helpers/addDays");

const checkifRecordExist = async (fieldsData, allAvPlan) => {
  //   const allAvPlan = await getAllData("Availability_Plan");
  const targetData = allAvPlan.filter(
    (item) =>
      item.Location === fieldsData.Location &&
      new Date(item.DateFrom) === new Date(fieldsData.DateFrom) &&
      new Date(item.DateTo) === new Date(fieldsData.DateTo)
  );

  if (targetData?.length > 0) return targetData;
  return null;
};

const handleAvPlan = async (DBData, allAvPlan) => {
  try {
    const fieldsData = DBData;

    const allAv = [];

    // const allAvPlan = await getAllData("Availability_Plan");

    const targetAvPlan = await checkifRecordExist(fieldsData, allAvPlan);
    const body = {
      ID: targetAvPlan && targetAvPlan[0]?.ID,
      Location: fieldsData.Location,
      DateFrom: formatDate(fieldsData.DateFrom),
      DateTo: formatDate(fieldsData.DateTo),
      Friday: fieldsData.Friday,
      Saturday: fieldsData.Saturday,
      Sunday: fieldsData.Sunday,
      Monday: fieldsData.Monday,
      Tuesday: fieldsData.Tuesday,
      Wednesday: fieldsData.Wednesday,
      Thursday: fieldsData.Thursday,
    };
    if (targetAvPlan) {
      await updateData(
        body,
        targetAvPlan[0]?.ID,
        "Availability_Plan",
        Availability_PlanSchema
      );
    } else {
      await addData(body, "Availability_Plan", Availability_PlanSchema);
    }

    const allEqsLoc = await getAllDataYard("Equipments_Location");
    const eqs = allEqsLoc.filter((item) =>
      item.End_Date === null
        ? item.Location === fieldsData.Location &&
          fieldsData.DateFrom >= item.Start_Date &&
          fieldsData.DateFrom <= new Date()
        : item.Location === fieldsData.Location &&
          fieldsData.DateFrom >= item.Start_Date &&
          fieldsData.DateFrom <= item.End_Date
    );
    // console.log(eqs);
    // const eqs = await getEqsInSite(fieldsData.Location);
    let mainAv = 0;
    let siteAv = 0;
    let avTime = 0;
    const addArray = [];
    const editArray = [];
    const filteredEqs = eqs.filter(
      (eq) =>
        eq.Equipment_Type === `Trench_Cutting_Machine` ||
        eq.Equipment_Type === `Drilling_Machine`
    );
    for (let i = 0; i < filteredEqs.length; i++) {
      let startDate = formatDate(fieldsData.DateFrom);
      let endDate = formatDate(fieldsData.DateTo);

      while (new Date(startDate) <= new Date(endDate)) {
        const avData = allAv.filter(
          (item) =>
            formatDate(item.Date_Time) === formatDate(startDate) &&
            item.Location === fieldsData.Location &&
            item.Equipment === filteredEqs[i][`Equipment`]
        );

        const targetData = allAvPlan.filter(
          (item) =>
            item.Location === fieldsData.Location &&
            formatDate(item.DateFrom) === formatDate(fieldsData.DateFrom) &&
            formatDate(item.DateTo) === formatDate(fieldsData.DateTo)
        );
        const avPlanData = targetData[0] && [
          {
            day: targetData[0][getDayName(startDate)],
          },
        ];

        if (avData.length > 1)
          throw new Error(`There are more than one record for this date`);
        if (avData.length === 0) {
          addArray.push({
            Date_Time: formatDate(startDate),
            Equipment: filteredEqs[i][`Equipment`],
            Location: fieldsData.Location,
            Periodic_Maintenance: 0,
            Breakdown_Time: 0,
            Available_Time: avPlanData
              ? avPlanData[0]?.day
              : body[getDayName(formatDate(startDate))],
            Maintenance_Availability: 1,
            Site_QC_Time: 0,
            Site_Availability: 1,
            Maintenance_ID: null,
          });
        } else if (avData.length === 1) {
          if (avPlanData[0]?.day === 0) {
            mainAv = 1;
            siteAv = 1;
          } else {
            mainAv =
              (Number(avPlanData[0]?.day) -
                Number(avData[0][`Periodic_Maintenance`]) -
                Number(avData[0][`Breakdown_Time`])) /
              (Number(avPlanData[0]?.day) -
                Number(avData[0][`Periodic_Maintenance`]));
            siteAv =
              (Number(avPlanData[0]?.day) -
                Number(avData[0][`Periodic_Maintenance`]) -
                Number(avData[0][`Site_QC_Time`])) /
              (Number(avPlanData[0]?.day) -
                Number(avData[0][`Periodic_Maintenance`]));
          }
          avTime =
            Number(avPlanData[0]?.day) -
            Number(avData[0][`Periodic_Maintenance`]) -
            Number(avData[0][`Breakdown_Time`]);
          editArray.push({
            ID: avData[0]?.ID,
            Available_Time: avTime,
            Maintenance_Availability: mainAv,
            Site_Availability: siteAv,
          });
        }
        startDate = formatDate(addDays(startDate, 1));
      }
    }

    // return { addData: addArray, editData: editArray, avPlan: body };
    // console.log(
    //   JSON.stringify({ addData: addArray, editData: editArray, avPlan: body })
    // );
    if (addArray.length > 0)
      await addMany(addArray, "Availability", AvailabilitySchema);
    if (editArray.length > 0)
      await updateMany(editArray, "Availability", AvailabilitySchema);
    // return res
    //   .status(200)
    //   .json({ addData: addArray, editData: editArray, avPlan: body });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: error.message });
  }
};

const migrateDate = async () => {
  const allAvPlan = await getAllDataYard("Availability_Plan");
  allAvPlan.sort((a, b) => a.DateFrom - b.DateFrom);
  const targetAvPlan = allAvPlan.filter(
    // (item) => new Date(formatDate(item.DateFrom)) >= new Date("2024-03-30")
    (item) => Number(item.ID) > 45588
  );
  for (let i = 0; i < targetAvPlan.length; i++) {
    console.log(
      `loading ${(((i + 1) / targetAvPlan.length) * 100).toFixed(2)} %`
    );
    await handleAvPlan(targetAvPlan[i], targetAvPlan);
  }
};

module.exports = { migrateDate };
