const {
  addManyQuery,
  addMany,
} = require("../../../../../services/mainService");
const {
  Order_NumberSchema,
} = require("../../../../../schemas/Order_Number/schema");

const addOrder = async (req, res) => {
  try {
    const bodyData = req.body;
    await addMany(bodyData, "Order_Number", Order_NumberSchema);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrder };
