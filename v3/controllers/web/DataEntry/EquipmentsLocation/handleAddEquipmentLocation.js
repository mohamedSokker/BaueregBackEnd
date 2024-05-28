const {
  // getAllData,
  addData,
  addDataQuery,
  updateData,
  updateManyQuery,
  addMany,
  updateMany,
} = require("../../../../services/mainService");
const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const {
  Equipments_LocationSchema,
} = require("../../../../schemas/Equipments_Location/schema");
const {
  Operating_HrsSchema,
} = require("../../../../schemas/Operating_Hrs/schema");

const handleAddEqLocation = async (req, res) => {
  try {
    const bodyData = req.body;
    const body = {
      Equipment: bodyData.Equipment,
      Start_Date: bodyData.Start_Date,
      End_Date: bodyData.End_Date,
      Location: bodyData.Location,
      UnderCarrage_Type: bodyData.UnderCarrage_Type,
      Equipment_Type: bodyData.Equipment_Type,
    };

    const opHrsBody = {
      Location: bodyData.Location,
      Equipment: bodyData.Equipment,
      Start_Date: bodyData.Start_Date,
      End_Date: bodyData.End_Date,
      Start_OperatingHrs: bodyData.Working_Hours,
      End_OperatingHrs: null,
    };

    let targetEqLoc = [];
    if (model["Equipments_Location"]) {
      model["Equipments_Location"].sort((a, b) => a.DateTime - b.DateTime);
      targetEqLoc = model["Equipments_Location"].filter(
        (item) =>
          item.Equipment === bodyData.Equipment && item.End_Date === null
      );
    } else {
      const query = `SELECT * FROM Equipments_Location WHERE Equipment = '${bodyData.Equipment}' AND End_Date IS NULL`;
      targetEqLoc = (await getData(query)).recordsets[0];
    }

    let resultEqLoc = [];
    targetEqLoc.map((item) => {
      resultEqLoc.push({
        ...item,
        Start_Date: new Date(item.Start_Date).toISOString().slice(0, 10),
        End_Date: new Date().toISOString().slice(0, 10),
      });
    });

    let targetOpHrs = [];
    if (model["Operating_Hrs"]) {
      model["Operating_Hrs"].sort((a, b) => a.DateTime - b.DateTime);
      targetOpHrs = model["Operating_Hrs"].filter(
        (item) =>
          item.Equipment === bodyData.Equipment && item.End_Date === null
      );
    } else {
      const query = `SELECT * FROM Operating_Hrs WHERE Equipment = '${bodyData.Equipment}' AND End_Date IS NULL`;
      targetOpHrs = (await getData(query)).recordsets[0];
    }

    let resultOpHrs = [];
    targetOpHrs.map((item) => {
      resultOpHrs.push({
        ...item,
        Start_Date: new Date(item.Start_Date).toISOString().slice(0, 10),
        End_Date: new Date().toISOString().slice(0, 10),
        End_OperatingHrs: bodyData.Working_Hours,
      });
    });

    await addData(body, "Equipments_Location", Equipments_LocationSchema);
    await updateMany(
      resultEqLoc,
      "Equipments_Location",
      Equipments_LocationSchema
    );

    await addData(opHrsBody, "Operating_Hrs", Operating_HrsSchema);
    await updateMany(resultOpHrs, "Operating_Hrs", Operating_HrsSchema);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleAddEqLocation };
