const JSONStream = require("JSONStream");

const { model } = require("../../../model/mainModel");

const orderIncomplete = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

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
    for (let i = 0; i < result.length; i++) {
      jsonStream.write(result[i]);
    }

    // End the JSONStream serializer
    jsonStream.end();

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`orderIncomplete b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`orderIncomplete a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { orderIncomplete };
