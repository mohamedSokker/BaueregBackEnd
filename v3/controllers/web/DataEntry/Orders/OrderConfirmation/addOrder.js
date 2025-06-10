const {
  addManyQuery,
  addMany,
} = require("../../../../../services/mainService");
const {
  Order_ConfirmationSchema,
} = require("../../../../../schemas/Order_Confirmation/schema");

const addOrder = async (req, res) => {
  try {
    const bodyData = req.body;
    await addMany(bodyData, "Order_Confirmation", Order_ConfirmationSchema);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrder };
