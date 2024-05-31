const {
  addManyQuery,
  addMany,
} = require("../../../../../services/mainService");
const {
  Order_InvoiceSchema,
} = require("../../../../../schemas/Order_Invoice/schema");

const addOrder = async (req, res) => {
  try {
    const bodyData = req.body;
    await addMany(bodyData, "Order_Invoice", Order_InvoiceSchema);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrder };
