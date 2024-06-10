const { model } = require("../../../model/mainModel");

const orderIncomplete = async (req, res) => {
  try {
    const result = [];
    model["Order_Confirmation"]?.map((item) => {
      const invoices = model["Order_Invoice"].filter(
        (inv) =>
          inv.ItemNo === item.PartNo &&
          inv.ReferenceNo.split("/")[1] === item.OrderNo.split("/")[1] &&
          Number(inv.ReferenceNo.split("/")[0].match(/[0-9]+/g)[0]) ===
            Number(item.OrderNo.split("/")[0].match(/[0-9]+/g)[0])
      );
      let invoiceQ = 0;
      let invoice = [];
      invoices.map((item) => {
        invoiceQ += item.Quantity;
        invoice.push(item.InvoiceNo);
      });
      const eq = model["Order_Number"].find(
        (eq) =>
          eq.Order_No.split("/")[1] === item.OrderNo.split("/")[1] &&
          Number(eq.Order_No.split("/")[0].match(/[0-9]+/g)[0]) ===
            Number(item.OrderNo.split("/")[0].match(/[0-9]+/g)[0])
      );
      if (Number(item.Quantity) - Number(invoiceQ) > 0)
        result.push({
          OrderNo: item.OrderNo,
          Equipment: eq?.Equipment,
          Description: item.Description,
          PartNo: item.PartNo,
          confirmationQ: item.Quantity,
          invoiceQ: invoiceQ,
          unRecievedQ: Number(item.Quantity) - Number(invoiceQ),
          deliveryDate: item.DeliveryDate,
          invoices: invoice.join(","),
        });
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { orderIncomplete };
