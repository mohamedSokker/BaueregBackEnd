const { model } = require("../../../../model/mainModel");
const { addDataQuery } = require("../../../../services/mainService");
const {
  Recieved_InvoicesSchema,
} = require("../../../../schemas/Recieved_Invoices/schema");

const handleAddReceivedInvoice = async (req, res) => {
  try {
    const bodyData = req.body;

    const targetOrders = [];

    const eqs = [];

    const targetInvoices = model["Order_Invoice"].filter(
      (item) => item.InvoiceNo.toString() === bodyData?.Invoices.toString()
    );
    targetInvoices?.map((inv) => {
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
      Invoices: bodyData?.Invoices,
      OrderNos: targetOrders.join(","),
      Equipments: eqs.join(","),
      Received_Date: bodyData?.Received_Date,
    };
    await addDataQuery(
      recievedInvoiceData,
      "Recieved_Invoices",
      Recieved_InvoicesSchema
    );
    return res.status(201).json({ message: `Success` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleAddReceivedInvoice };
