const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    // const PerEqs = fieldsData.usersData[0].roles.Editor?.Equipments.concat(
    //   fieldsData.usersData[0].roles.User?.Equipments
    // );

    // let eqURL = ``;
    // for (let i = 0; i < PerEqs.length; i++) {
    //   if (i === 0) {
    //     eqURL += ` (Availability.Equipment = '${PerEqs[i].name}'`;
    //   } else if (i === PerEqs.length - 1) {
    //     eqURL += ` OR Availability.Equipment = '${PerEqs[i].name}')`;
    //   } else {
    //     eqURL += ` OR Availability.Equipment = '${PerEqs[i].name}'`;
    //   }
    // }
    let query = ``;
    // let queryLastWeek = ``;
    let dataQuery = ``;
    const dataMainQuery = `SELECT * FROM Machinary_Location 
                       WHERE End_Date IS NULL AND 
                       Location = '${fieldsData.Location}'`;
    const mainQuery = `SELECT COUNT(Machinery_Type) AS COUNT
                       FROM Machinary_Location 
                       WHERE End_Date IS NULL AND
                       Location = '${fieldsData.Location}'`;
    // const filterQuery = `Equipment_Type = '${fieldsData.filter}'`;
    // const dateTimeQuery = `Date_Time >= '${fieldsData.dateTime}'`;
    // const lastWeekQuery = `Date_Time < GETDATE() - 7`;
    // if (eqURL.length === 0) return res.status(200).json([]);
    // if (!fieldsData?.dateTime && !fieldsData?.filter) {
    query = `${mainQuery}`;
    dataQuery = `${dataMainQuery}`;
    //   queryLastWeek = `${mainQuery} AND ${lastWeekQuery} AND ${eqURL}`;
    // }
    // } else if (fieldsData?.dateTime && fieldsData?.filter) {
    //   query = `${mainQuery} `;
    //   dataQuery = `${dataMainQuery} AND ${dateTimeQuery} AND ${filterQuery} AND ${eqURL}`;
    //   queryLastWeek = `${mainQuery} AND ${dateTimeQuery} AND
    //                    ${filterQuery} AND ${lastWeekQuery} AND ${eqURL}`;
    // } else if (fieldsData?.dateTime && !fieldsData?.filter) {
    //   query = `${mainQuery} AND ${dateTimeQuery} AND ${eqURL}`;
    //   dataQuery = `${dataMainQuery} AND ${dateTimeQuery} AND ${eqURL}`;
    //   queryLastWeek = `${mainQuery} AND ${dateTimeQuery} AND ${lastWeekQuery} AND ${eqURL}`;
    // } else if (!fieldsData?.dateTime && fieldsData?.filter) {
    //   query = `${mainQuery} AND ${filterQuery} AND ${eqURL}`;
    //   dataQuery = `${dataMainQuery} AND ${filterQuery} AND ${eqURL}`;
    //   queryLastWeek = `${mainQuery} AND ${filterQuery} AND ${lastWeekQuery} AND ${eqURL}`;
    // }

    let data = await getData(query);
    data = data.recordsets[0];
    // console.log(data);
    // let dataLastWeek = await getData(queryLastWeek);
    // dataLastWeek = dataLastWeek.recordsets[0];
    const allData = await getData(dataQuery);
    let per = 0;
    if (!data[0]?.COUNT) {
      per = 0;
    } else {
      per = data[0]?.COUNT;
    }
    // let perLastWeek = 0;
    // if (!dataLastWeek[0]?.SUM) {
    //   perLastWeek = 0;
    // } else {
    //   perLastWeek = (
    //     (dataLastWeek[0]?.SUM / dataLastWeek[0]?.COUNT) *
    //     100
    //   ).toFixed(1);
    // }
    const result = {
      per: Number(per),
      //   diff: Number(per) - Number(perLastWeek),
      data: allData.recordsets[0],
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
