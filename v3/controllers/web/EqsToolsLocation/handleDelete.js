// const { model } = require("../../../model/mainModel");
// const {
//   EqsToolsLocationSchema,
// } = require("../../../schemas/EqsToolsLocation/schema");
const {
  deleteData,
  deleteDataQuery,
} = require("../../../services/mainService");

const handleDelete = async (req, res) => {
  try {
    const bodyData = req.body;
    await deleteDataQuery(bodyData.ID, "EqsToolsLocation");
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleDelete };
