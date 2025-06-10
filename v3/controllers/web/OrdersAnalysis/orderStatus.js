const JSONStream = require("JSONStream");

const { model } = require("../../../model/mainModel");

const orderIncomplete = (item) => {
  try {
    let result = {};
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

    // console.log(item.Quantity, invoiceQ);
    if (Number(item.Quantity) - Number(invoiceQ) > 0) {
      result = { invoiceQ: 0, invoices: invoice };
    } else {
      result = { invoiceQ: 1, invoices: invoice };
    }
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const orderStatus = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    const result = [];
    const uniqueOrders = [];
    const myReferenceOrder = [];
    model["Order_Number"].map((item) => {
      if (!myReferenceOrder.includes(item.Order_No)) {
        myReferenceOrder.push(item.Order_No);
        uniqueOrders.push(item);
      }
    });

    const RecievedInvoices = [];
    model["Recieved_Invoices"]
      .filter((item) => item.Received_Date !== null)
      .map((item) => {
        RecievedInvoices.push(item.Invoices);
      });

    // console.log(RecievedInvoices);

    uniqueOrders.map((item) => {
      let isQuotation = 0;
      let isConfirmation = 0;
      let isInvoice = 0;
      let isRecieved = 0;
      let invoiceCount = 0;
      let RecevedCount = 0;

      let Status = "";
      let Reason = "";

      const confirmationItems = model["Order_Confirmation"].filter(
        (confirm) =>
          confirm.OrderNo.split("/")[1] === item.Order_No.split("/")[1] &&
          Number(confirm.OrderNo.split("/")[0].match(/[0-9]+/g)[0]) ===
            Number(item.Order_No.split("/")[0].match(/[0-9]+/g)[0])
      );
      if (confirmationItems.length > 0) isConfirmation = 1;

      if (
        model["Order_Quotation"].filter(
          (quotation) =>
            quotation.OrderNo.split("/")[1] === item.Order_No.split("/")[1] &&
            Number(quotation.OrderNo.split("/")[0].match(/[0-9]+/g)[0]) ===
              Number(item.Order_No.split("/")[0].match(/[0-9]+/g)[0])
        ).length > 0
      )
        isQuotation = 1;

      let invoices = [];

      if (confirmationItems.length !== 0) {
        confirmationItems.map((confirm) => {
          invoiceCount += orderIncomplete(confirm).invoiceQ;
          invoices.push(...orderIncomplete(confirm).invoices);
        });
      }
      invoices = Array.from(new Set(invoices));
      invoices.map((inv) => {
        if (RecievedInvoices.includes(inv)) {
          RecevedCount += 1;
        }
      });
      //   console.log(invoiceCount, confirmationItems.length);
      isInvoice =
        confirmationItems.length === 0
          ? 0
          : Number(invoiceCount) / Number(confirmationItems.length);

      isRecieved =
        Number(invoices.length) === 0
          ? 0
          : (Number(RecevedCount) / Number(invoices.length)) * isInvoice;

      if (isQuotation < 1) {
        Status = "InCompleted";
        Reason = "Has No Quotation";
      } else if (isConfirmation < 1) {
        Status = "InCompleted";
        Reason = "Has No Confirmation";
      } else if (isInvoice < 1) {
        Status = "InCompleted";
        Reason = "Incomplete Invoice";
      } else if (isRecieved < 1) {
        Status = "InCompleted";
        Reason = "UnRecieved";
      } else {
        Status = "Completed";
        Reason = "Received";
      }

      //   console.log(isInvoice);
      result.push({
        Order_No: item.Order_No,
        Order_Date: item.Date,
        Equipment: item.Equipment,
        Quotation: Number(isQuotation.toFixed(3)),
        Confirmation: Number(isConfirmation.toFixed(3)),
        Invoice: Number(isInvoice.toFixed(3)),
        Recieved: Number(isRecieved.toFixed(3)),
        Calculated_Status: Number(
          ((isQuotation + isConfirmation + isInvoice + isRecieved) / 4).toFixed(
            3
          )
        ),
        Status: Status,
        Reason: Reason,
      });
    });
    for (let i = 0; i < result.length; i++) {
      jsonStream.write(result[i]);
    }

    // End the JSONStream serializer
    jsonStream.end();

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`orderStatus b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`orderStatus a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { orderStatus };
