const {
  addManyQuery,
  addMany,
} = require("../../../../../services/mainService");
const {
  Order_QuotationSchema,
} = require("../../../../../schemas/Order_Quotation/schema");

const addOrder = async (req, res) => {
  try {
    const bodyData = req.body;
    await addMany(bodyData, "Order_Quotation", Order_QuotationSchema);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrder };
