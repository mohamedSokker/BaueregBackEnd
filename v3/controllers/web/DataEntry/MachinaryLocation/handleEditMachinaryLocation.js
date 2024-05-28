const {
  // getAllData,
  addData,
  updateData,
  updateManyQuery,
  addMany,
  updateMany,
  updateDataQuery,
} = require("../../../../services/mainService");
const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const {
  Machinary_LocationSchema,
} = require("../../../../schemas/Machinary_Location/schema");

const handleEditMachinaryLocation = async (req, res) => {
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
    await updateData(
      body,
      req.params.id,
      "Machinary_Location",
      Machinary_LocationSchema
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleEditMachinaryLocation };
