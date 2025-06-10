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
  Equipments_LocationSchema,
} = require("../../../../schemas/Equipments_Location/schema");

const handleEditEqLocation = async (req, res) => {
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
    await updateData(
      body,
      req.params.id,
      "Equipments_Location",
      Equipments_LocationSchema
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleEditEqLocation };
