const {
  // getAllData,
  addData,
  updateData,
  addMany,
  updateMany,
} = require("../../../../services/mainService");
const {
  Availability_PlanSchema,
} = require("../../../../schemas/Availability_Plan/schema");
const {
  AvailabilitySchema,
} = require("../../../../schemas/Availability/schema");
const getEqsInSite = require("../../../../helpers/getEquipmentsinSite");
const formatDate = require("../../../../helpers/formatdate");
const getDayName = require("../../../../helpers/getDayName");
const addDays = require("../../../../helpers/addDays");

const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const checkifRecordExist = async (fieldsData, allAvPlan) => {
  // const allAvPlan = await getAllData("Availability_Plan");
  const targetData = allAvPlan.filter(
    (item) =>
      item.Location === fieldsData.Location &&
      new Date(item.DateFrom) === new Date(fieldsData.DateFrom) &&
      new Date(item.DateTo) === new Date(fieldsData.DateTo)
  );

  if (targetData?.length > 0) return targetData;
  return null;
};

const handleAvPlan = async (req, res) => {
  try {
    const fieldsData = req.body;

    // const allAv = await getAllData("Availability");
    // const allAvPlan = await getAllData("Availability_Plan");
    let targetAvPlan = [];
    if (model["Availability_Plan"]) {
      targetAvPlan = await checkifRecordExist(
        fieldsData,
        model["Availability_Plan"]
      );
    } else {
      targetAvPlan = await checkifRecordExist(
        fieldsData,
        (
          await getData("Availability_Plan")
        ).recordsets[0]
      );
    }

    const body = {
      ID: targetAvPlan && targetAvPlan[0]?.ID,
      Location: fieldsData.Location,
      DateFrom: fieldsData.DateFrom,
      DateTo: fieldsData.DateTo,
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

    const eqs = await getEqsInSite(fieldsData.Location);
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
        let avData = [];
        if (model["Availability"]) {
          avData = model["Availability"].filter(
            (item) =>
              formatDate(item.Date_Time) === formatDate(startDate) &&
              item.Location === fieldsData.Location &&
              item.Equipment === filteredEqs[i][`Equipment`]
          );
        } else {
          avData = await (
            await getData("Availability")
          ).recordsets[0].filter(
            (item) =>
              formatDate(item.Date_Time) === formatDate(startDate) &&
              item.Location === fieldsData.Location &&
              item.Equipment === filteredEqs[i][`Equipment`]
          );
        }

        // const targetData = allAvPlan.filter(
        //   (item) =>
        //     item.Location === fieldsData.Location &&
        //     formatDate(item.DateFrom) === formatDate(fieldsData.DateFrom) &&
        //     formatDate(item.DateTo) === formatDate(fieldsData.DateTo)
        // );
        const targetData = [fieldsData];
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
          if (Number(avPlanData[0]?.day) === 0) {
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
    if (addArray.length > 0)
      await addMany(addArray, "Availability", AvailabilitySchema);
    if (editArray.length > 0)
      await updateMany(editArray, "Availability", AvailabilitySchema);

    // return res
    //   .status(200)
    //   .json({ addData: addArray, editData: editArray, avPlan: body });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleAvPlan };
