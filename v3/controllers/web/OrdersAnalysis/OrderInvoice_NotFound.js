const JSONStream = require("JSONStream");

const { model } = require("../../../model/mainModel");

const OrderInvoice_NotFound = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    const result = [];
    model["Order_Invoice"]?.map((item) => {
      const invoices = model["Order_Confirmation"].filter(
        (inv) => inv.PartNo === item.ItemNo
      );
      if (invoices.length === 0) {
        result.push(item);
      }
    });
    for (let i = 0; i < result.length; i++) {
      jsonStream.write(result[i]);
    }

    // End the JSONStream serializer
    jsonStream.end();

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(
      `OrderInvoice_NotFound b ${memoryUsageBefore / (1024 * 1024)} MB`
    );
    console.log(`OrderInvoice_NotFound a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { OrderInvoice_NotFound };
