const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");
const { addData } = require("../../../../services/mainService");
const { WorkShopsSchema } = require("../../../../schemas/WorkShops/schema");

const AddWorkshop = async (req, res) => {
  try {
    const bodyData = req.body;
    await addData({ Name: bodyData.name }, "WorkShops", WorkShopsSchema);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { AddWorkshop };
