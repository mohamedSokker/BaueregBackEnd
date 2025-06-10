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
  Machinary_LocationSchema,
} = require("../../../../schemas/Machinary_Location/schema");

const handleAddMachinaryLocation = async (req, res) => {
  try {
    const bodyData = req.body;
    const body = {
      Machinery_Type: bodyData.Machinery_Type,
      Machinery_Model: bodyData.Machinery_Model,
      Machinary_Specs: bodyData.Machinary_Specs,
      Code: bodyData.Code,
      Serial_No: bodyData.Serial_No,
      Location: bodyData.Location,
      Machinery_Status: bodyData.Machinery_Status,
      Start_Date: bodyData.Start_Date,
      End_Date: bodyData.End_Date,
    };

    let targetEqLoc = [];
    if (model["Machinary_Location"]) {
      model["Machinary_Location"].sort((a, b) => a.DateTime - b.DateTime);
      targetEqLoc = model["Machinary_Location"].filter(
        (item) =>
          item.Machinary_Specs === bodyData.Machinary_Specs &&
          item.Code === bodyData.Code &&
          item.End_Date === null
      );
    } else {
      const query = `SELECT * FROM Machinary_Location WHERE Machinary_Specs = '${bodyData.Machinary_Specs}' AND Code = '${bodyData.Code}' AND End_Date IS NULL`;
      targetEqLoc = (await getData(query)).recordsets[0];
    }

    let resultEqLoc = [];
    targetEqLoc.map((item) => {
      resultEqLoc.push({
        ...item,
        Start_Date: new Date(item.Start_Date).toISOString().slice(0, 10),
        End_Date: new Date(bodyData.Start_Date).toISOString().slice(0, 10),
      });
    });

    await addData(body, "Machinary_Location", Machinary_LocationSchema);
    await updateMany(
      resultEqLoc,
      "Machinary_Location",
      Machinary_LocationSchema
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleAddMachinaryLocation };
