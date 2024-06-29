const { model } = require("../../../model/mainModel");
const {
  EqsToolsLocationSchema,
} = require("../../../schemas/EqsToolsLocation/schema");
const {
  addData,
  updateMany,
  addDataQuery,
  updateManyQuery,
} = require("../../../services/mainService");

const handleAdd = async (req, res) => {
  try {
    const bodyData = req.body;
    const targetData = model["EqsToolsLocation"].filter(
      (item) =>
        item.End_Date === null &&
        item.Type === bodyData.Type &&
        item.Code === bodyData.Code
    );
    await addDataQuery(bodyData, "EqsToolsLocation", EqsToolsLocationSchema);
    await updateManyQuery(
      targetData,
      "EqsToolsLocation",
      EqsToolsLocationSchema
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleAdd };
