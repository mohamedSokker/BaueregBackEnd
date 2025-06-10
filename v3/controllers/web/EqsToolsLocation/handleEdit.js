// const { model } = require("../../../model/mainModel");
const {
  EqsToolsLocationSchema,
} = require("../../../schemas/EqsToolsLocation/schema");
const {
  updateData,
  updateDataQuery,
} = require("../../../services/mainService");

const handleEdit = async (req, res) => {
  try {
    const bodyData = req.body;
    await updateData(
      bodyData,
      bodyData.ID,
      "EqsToolsLocation",
      EqsToolsLocationSchema
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleEdit };
