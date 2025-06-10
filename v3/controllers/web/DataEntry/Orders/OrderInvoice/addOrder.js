const {
  addManyQuery,
  addMany,
  addData,
  addDataQuery,
} = require("../../../../../services/mainService");
const {
  Order_InvoiceSchema,
} = require("../../../../../schemas/Order_Invoice/schema");
const {
  Recieved_InvoicesSchema,
} = require("../../../../../schemas/Recieved_Invoices/schema");
const { model } = require("../../../../../model/mainModel");

const addOrder = async (req, res) => {
  try {
    const bodyData = req.body;

    const targetOrders = [];

    const eqs = [];
    bodyData?.map((inv) => {
      const targetOrder = model["Order_Number"]?.find(
        (item) =>
          inv.ReferenceNo.split("/")[1] === item.Order_No.split("/")[1] &&
          Number(inv.ReferenceNo.split("/")[0].match(/[0-9]+/g)[0]) ===
            Number(item.Order_No.split("/")[0].match(/[0-9]+/g)[0])
      );
      targetOrder &&
        !targetOrders.includes(inv?.ReferenceNo) &&
        targetOrders.push(inv?.ReferenceNo);
      targetOrder &&
        !eqs.includes(targetOrder?.Equipment) &&
        eqs.push(targetOrder?.Equipment);
    });
    const recievedInvoiceData = {
      Invoices: bodyData?.[0]?.InvoiceNo,
      OrderNos: targetOrders.join(","),
      Equipments: eqs.join(","),
      Received_Date: null,
    };
    await addMany(bodyData, "Order_Invoice", Order_InvoiceSchema);
    await addData(
      recievedInvoiceData,
      "Recieved_Invoices",
      Recieved_InvoicesSchema
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrder };
