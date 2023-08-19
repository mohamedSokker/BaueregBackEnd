const fs = require("fs");
const path = require("path");
const pdfDoc = require("pdf-lib");
const pdf = require("pdf-parse");

const pdfAnalysis = async (req, res) => {
  let prevpdfText = "";
  const path = req.query.filepath;
  if (fs.existsSync(path)) {
    let pdfBytes = fs.readFileSync(path);
    await pdf(pdfBytes).then((pdfdata) => {
      prevpdfText = pdfdata.text;
    });
    let targetDeliveryDate;
    let targetItem;
    targetDeliveryDate = getDeliveryDate(prevpdfText);
    if (targetDeliveryDate === "See item") {
      targetItem = getConfirmationItems(prevpdfText);
    } else {
      targetItem = getConfirmationItemsPublic(prevpdfText);
    }
    res.send(targetItem);
  } else {
    res.sendStatus(404);
  }
};

const checkEndOfNumber = (text, startIndex) => {
  let i = 0;
  for (i = 0; i < text.length; i++) {
    if (isNaN(text[i]) && text[i] !== "." && text[i] !== ",") {
      break;
    }
  }
  return {
    text: text.slice(startIndex, startIndex + i),
    startIndex,
    endIndex: startIndex + i,
    textlength: text.length,
    nextText: text.slice(startIndex + i),
  };
};

const checkEndOfString = (text, startIndex) => {
  let flag = false;
  let i = 0;
  for (i = 0; i < text.length; i++) {
    if (!isNaN(text[i])) {
      flag = true;
      break;
    }
  }
  return {
    text: text.slice(startIndex, startIndex + i),
    startIndex,
    endIndex: startIndex + i,
    nextText: text.slice(startIndex + i),
  };
};

const getDate = (text) => {
  let dateKeyword = text.indexOf("Date:");
  if (dateKeyword) {
    let dateEnd = text.indexOf("\n", dateKeyword + 6);
    let targetDate = text.slice(dateKeyword + 6, dateEnd);
    let targetDateArray = targetDate.split(".");
    let dateString = `${targetDateArray[2]}-${targetDateArray[1]}-${targetDateArray[0]}`;
    let dt = new Date(dateString);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 10);
  }
  return "No Match";
};

const getConfirmationNo = (text) => {
  let confirmKeyword = text.indexOf("Quotation");
  let confirmEnd = text.indexOf("\n", confirmKeyword + 9);
  return text.slice(confirmKeyword + 9, confirmEnd);
};

const getOrderNo = (text) => {
  let orderKeyword = text.indexOf("Reference number:");
  let orderEnd = text.indexOf("\n", orderKeyword + 18);
  let data = text.slice(orderKeyword + 18, orderEnd);
  let yearDataArray = data.split("/");
  if (yearDataArray.length === 2) {
    let orderData = yearDataArray[0];
    let yearData = yearDataArray[1];
    if (yearData.length > 3) {
      yearData = yearData.slice(yearData.length - 3);
    }
    data = `${orderData}/${yearData}`;
  }
  return data;
};

const getShipmentMode = (text) => {
  let shipmentKeyword = text.indexOf("Mode of shipment:");
  if (shipmentKeyword) {
    let shipmentEnd = text.indexOf("\n", shipmentKeyword + 18);
    return text.slice(shipmentKeyword + 18, shipmentEnd);
  }
};

const getDeliveryDate = (text) => {
  let deliveryKeyword = text.indexOf("Delivery period/date:");
  let deliveyEnd = text.indexOf("\n", deliveryKeyword + 22);
  let target = text.slice(deliveryKeyword + 22, deliveyEnd);
  if (target === "See item") {
    return target.trim();
  } else {
    try {
      let targetDateArray = target.split(".");
      let dateString = `${targetDateArray[2]}-${targetDateArray[1]}-${targetDateArray[0]}`;
      let dt = new Date(dateString);
      dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
      return dt.toISOString().slice(0, 10);
    } catch (error) {
      return target.trim();
    }
  }
};

const getConfirmationItems = (text) => {
  let count = 0;
  let itemStart;
  let itemDeliveryDate;
  let itemEndPos;
  let item;
  let data = [];
  let targetDate = getDate(text);
  let targetQuotationNo = getConfirmationNo(text);
  let targetOrderNo = getOrderNo(text);
  let targetShipmentMode = getShipmentMode(text);
  while (itemDeliveryDate !== -1 && itemEndPos !== -1) {
    if (count === 0) {
      itemStart = text.indexOf("Total EUR") + 10;
    } else {
      itemStart = itemEndPos + 1;
    }
    itemDeliveryDate = text.indexOf("Delivery period/date:", itemStart);
    if (itemDeliveryDate === -1) break;
    itemEndPos = text.indexOf("\n", itemDeliveryDate);
    if (itemEndPos === -1) break;
    item = text.slice(itemStart, itemEndPos);
    item = OrderHeaderOrFooter(item);
    // item = removeItemFooter(item);
    // item = removeItemHeader(item);
    item = item.trim();
    let targetPartNo = checkEndOfNumber(item, 0);
    let targetDescription = targetPartNo.nextText.split("   ");
    let partNo = targetPartNo.text;
    partNo = Number(partNo.slice(3)).toString();
    let remain = "";
    for (let j = 1; j < targetDescription.length; j++) {
      remain += " " + targetDescription[j];
    }
    remain = remain.trim();
    let targetQuantity = remain.split(" ");
    let Qremain = "";
    for (let j = 1; j < targetQuantity.length; j++) {
      Qremain += " " + targetQuantity[j];
    }
    Qremain = Qremain.trim();
    let targetUnit = checkEndOfString(Qremain, 0);
    let unitRemain = targetUnit.nextText;
    let targetUnitPrice = unitRemain.split(" ");
    let UnitPriceRemain = "";
    for (let j = 1; j < targetUnitPrice.length; j++) {
      UnitPriceRemain += " " + targetUnitPrice[j];
    }
    UnitPriceRemain = UnitPriceRemain.trim();
    targetUnitPrice = targetUnitPrice[0].replaceAll(".", "");
    targetUnitPrice = targetUnitPrice.replaceAll(",", ".");

    let targetTotalPrice = UnitPriceRemain.split(" ");
    let totalPriceRemain = "";
    for (let j = 1; j < targetTotalPrice.length; j++) {
      totalPriceRemain += " " + targetTotalPrice[j];
    }
    totalPriceRemain = totalPriceRemain.trim() + "\n";
    targetTotalPrice = targetTotalPrice[0].replaceAll(".", "");
    targetTotalPrice = targetTotalPrice.replaceAll(",", ".");
    let deliveryDate = getDeliveryDate(totalPriceRemain);

    data.push({
      // item,
      targetDate,
      targetQuotationNo,
      targetOrderNo,
      // targetShipmentMode,
      partNo,
      Desc: targetDescription[0],
      Quantity: targetQuantity[0],
      Unit: targetUnit.text,
      targetUnitPrice,
      targetTotalPrice,
      deliveryDate,
    });
    count++;
  }

  return data;
};

const getConfirmationItemsPublic = (text) => {
  let count = 0;
  let itemStart;
  let itemDeliveryDate;
  let itemEndPos;
  let item;
  let data = [];
  let targetDate = getDate(text);
  let targetConfirmNo = getConfirmationNo(text);
  let targetOrderNo = getOrderNo(text);
  let targetShipmentMode = getShipmentMode(text);
  let deliveryDate = getDeliveryDate(text);
  while (itemDeliveryDate !== -1 && itemEndPos !== -1) {
    if (count === 0) {
      itemStart = text.indexOf("Total EUR") + 10;
    } else {
      itemStart = itemEndPos + 2;
    }
    itemDeliveryDate = text.indexOf("Weight:", itemStart);
    if (itemDeliveryDate === -1) break;
    itemEndPos = text.indexOf("\n", itemDeliveryDate);
    if (itemEndPos === -1) break;
    item = text.slice(itemStart, itemEndPos);
    item = OrderHeaderOrFooter(item);
    // item = removeItemFooter(item);
    // item = removeItemHeader(item);
    item = item.trim();
    let targetPartNo = checkEndOfNumber(item, 0);
    let targetDescription = targetPartNo.nextText.split("   ");
    let partNo = targetPartNo.text;
    partNo = Number(partNo.slice(3)).toString();
    let remain = "";
    for (let j = 1; j < targetDescription.length; j++) {
      remain += " " + targetDescription[j];
    }
    remain = remain.trim();
    let targetQuantity = remain.split(" ");
    let Qremain = "";
    for (let j = 1; j < targetQuantity.length; j++) {
      Qremain += " " + targetQuantity[j];
    }
    Qremain = Qremain.trim();
    let targetUnit = checkEndOfString(Qremain, 0);
    let unitRemain = targetUnit.nextText;
    let targetUnitPrice = unitRemain.split(" ");
    let UnitPriceRemain = "";
    for (let j = 1; j < targetUnitPrice.length; j++) {
      UnitPriceRemain += " " + targetUnitPrice[j];
    }
    UnitPriceRemain = UnitPriceRemain.trim();
    targetUnitPrice = targetUnitPrice[0].replaceAll(".", "");
    targetUnitPrice = targetUnitPrice.replaceAll(",", ".");

    let targetTotalPrice = UnitPriceRemain.split(" ");
    let totalPriceRemain = "";
    for (let j = 1; j < targetTotalPrice.length; j++) {
      totalPriceRemain += " " + targetTotalPrice[j];
    }
    totalPriceRemain = totalPriceRemain.trim();
    targetTotalPrice = targetTotalPrice[0].replaceAll(".", "");
    targetTotalPrice = targetTotalPrice.replaceAll(",", ".");

    data.push({
      targetDate,
      targetConfirmNo,
      targetOrderNo,
      targetShipmentMode,
      partNo,
      Desc: targetDescription[0],
      Quantity: targetQuantity[0],
      Unit: targetUnit.text,
      targetUnitPrice,
      targetTotalPrice,
      deliveryDate,
    });
    count++;
  }

  return data;
};

const removeItemHeader = (text) => {
  let data = text;
  let headerPos = text.indexOf("Quotation");
  if (headerPos !== -1) {
    let targetStart = headerPos;
    let targetEnd = text.indexOf("Total EUR");
    if (targetEnd !== -1) {
      if (targetStart === 0) {
        data = text.slice(targetEnd + 10);
      } else {
        let text1 = text.slice(0, targetStart - 1);
        let text2 = text.slice(targetEnd + 10);
        data = `${text1} ${text2}`;
      }
    }
  }
  return data;
};

const removeItemFooter = (text) => {
  let data = text;
  let footerPos = text.indexOf("BAUER Spezialtiefbau GmbH");
  if (footerPos !== -1) {
    let targetStart = footerPos;
    let targetEnd = "";
    if (text.indexOf("Total EUR") !== -1) {
      targetEnd = text.indexOf("Total EUR");
      if (targetStart === 0) {
        data = text.slice(targetEnd + 10);
      } else {
        let text1 = text.slice(0, targetStart - 1);
        let text2 = text.slice(targetEnd + 10);
        data = `${text1} ${text2}`;
      }
    } else if (text.indexOf("Weight") !== -1) {
      targetEnd = text.indexOf("Weight");
      if (targetStart === 0) {
        data = text.slice(targetEnd + 7);
      } else {
        let text1 = text.slice(0, targetStart - 1);
        let text2 = text.slice(targetEnd + 7);
        data = `${text1} ${text2}`;
      }
    } else if (text.indexOf("Delivery period/date:") !== -1) {
      targetEnd = text.indexOf("Delivery period/date:");
      if (targetStart === 0) {
        data = text.slice(targetEnd + 22);
      } else {
        let text1 = text.slice(0, targetStart - 1);
        let text2 = text.slice(targetEnd + 22);
        data = `${text1} ${text2}`;
      }
    }
  }
  return data;
};

const OrderHeaderOrFooter = (text) => {
  let header = text.indexOf("Quotation");
  let footer = text.indexOf("BAUER Spezialtiefbau GmbH");
  let textData = text;
  if (header !== -1 && footer !== -1) {
    if (header < footer) {
      textData = removeItemHeader(textData);
      textData = removeItemFooter(textData);
    } else {
      textData = removeItemFooter(textData);
      textData = removeItemHeader(textData);
    }
  } else if (header === -1 && footer !== -1) {
    textData = removeItemFooter(textData);
  } else if (header !== -1 && footer === -1) {
    textData = removeItemHeader(textData);
  }
  return textData;
};

module.exports = { pdfAnalysis };
