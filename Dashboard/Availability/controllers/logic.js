const { getData } = require("../../../functions/getData");
const addDays = require("../../../Logic/globalFunction/addDays");

const filterDate = async (data, date) => {
  if (date) {
    return data.filter(
      (d) =>
        new Date(d["Date_Time"]) <= new Date(date) &&
        new Date(d["Date_Time"]) >= new Date("2023-01-01")
    );
  } else {
    return data.filter(
      (d) => new Date(d["Date_Time"]) >= new Date("2023-01-01")
    );
  }
};

const eqsFilter = async (data, eqs) => {
  return data.filter((d) => eqs.includes(d["Equipment"]));
};

const filterFilter = async (result, filter) => {
  if (filter) {
    return result.filter((d) => d["Equipment_Type"] === filter);
  } else {
    return result.filter(
      (d) =>
        d["Equipment_Type"] === "Trench_Cutting_Machine" ||
        d["Equipment_Type"] === "Drilling_Machine"
    );
  }
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const perEqs = fieldsData.usersData[0]?.roles.Editor?.Equipments.concat(
      fieldsData.usersData[0]?.roles.User?.Equipments
    );

    let eqs = [];
    for (let j = 0; j < perEqs.length; j++) {
      eqs.push(perEqs[j].name);
    }

    if (eqs.length === 0) return res.status(200).json([]);

    const dataMainQuery = `SELECT Availability.Date_Time,Availability.Maintenance_Availability,
                       Availability.Equipment, Equipments_Location.Equipment_Type 
                       FROM Availability 
                       JOIN Equipments_Location
                       ON (Availability.Equipment = Equipments_Location.Equipment) 
                       WHERE Equipments_Location.End_Date IS NULL`;

    let allData = await getData(dataMainQuery);
    allData = allData.recordsets[0];
    allData = await filterFilter(allData, fieldsData?.filter);
    allData = await eqsFilter(allData, eqs);
    allData = await filterDate(allData, fieldsData?.dateTime);
    allData.sort((a, b) => a["Date_Time"] - b["Date_Time"]);

    let resultLastWeek = !fieldsData?.dateTime
      ? await filterDate(allData, addDays(new Date(), -7))
      : await filterDate(allData, addDays(fieldsData?.dateTime, -7));

    resultLastWeek.sort((a, b) => a["Date_Time"] - b["Date_Time"]);

    let per = 0;
    let perLastWeek = 0;

    for (let i = 0; i < allData.length; i++) {
      per += Number(allData[i]["Maintenance_Availability"]);
    }

    if (allData.length > 0) {
      per = ((per / allData.length) * 100).toFixed(1);
    }

    for (let i = 0; i < resultLastWeek.length; i++) {
      perLastWeek += Number(resultLastWeek[i]["Maintenance_Availability"]);
    }

    if (resultLastWeek.length > 0) {
      perLastWeek = ((perLastWeek / resultLastWeek.length) * 100).toFixed(1);
    }

    const result = {
      per: Number(per),
      diff: (Number(per) - Number(perLastWeek)).toFixed(2),
      data: allData,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
