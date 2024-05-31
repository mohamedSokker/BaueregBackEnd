const fs = require("fs");
const path = require("path");
const pdfDoc = require("pdf-lib");
const pdf = require("pdf-parse");

const pdfAnalysis = async (req, res) => {
  try {
    let prevpdfText = "";
    const startPath = req.body.path;
    const path = `/home/mohamed/bauereg/Orders/Bauer/Order Invoice/${startPath}`;
    console.log(path);
    // const path = req.query.filepath;
    if (fs.existsSync(path)) {
      let pdfBytes = fs.readFileSync(path);
      await pdf(pdfBytes).then((pdfdata) => {
        prevpdfText = pdfdata.text;
      });
      let targetItem = getConfirmationItems(prevpdfText);
      return res.status(200).json(targetItem);
    } else {
      throw new Error(`Directory Not found`);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function replaceAllChar(string, char1, char2) {
  while (string.includes(char1)) {
    string = string.replace(char1, char2);
  }
  return string;
}

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
    textLength: text.length,
    nextText: text.slice(startIndex + i),
  };
};

const getDate = (text) => {
  let dateKeyword = text.indexOf("Date");
  let dateStart = text.indexOf("\n", dateKeyword + 6);
  dateStart = dateStart + 1;
  let dateEnd = text.indexOf("\n", dateStart);
  let targetText = text.slice(dateStart, dateEnd);
  let dateEndArray = targetText.split(".");
  let dateDay = dateEndArray[0];
  dateDay = dateDay.slice(dateDay.length - 2);
  let dateYear = dateEndArray[2];
  dateYear = dateYear.slice(0, 4);
  let targetDate = `${dateDay}.${dateEndArray[1]}.${dateYear}`;
  let targetDateArray = targetDate.split(".");
  let dateString = `${targetDateArray[2]}-${targetDateArray[1]}-${targetDateArray[0]}`;
  return dateString;
};

const getConfirmationNo = (text) => {
  let confirmKeyword = text.indexOf("Invoice No.");
  let confirmStart = text.indexOf("\n", confirmKeyword + 10);
  confirmStart = confirmStart + 1;
  let confirmEnd = text.indexOf("\n", confirmStart);
  let targetText = text.slice(confirmStart, confirmEnd);
  targetText = targetText.split(".")[0];
  targetText = targetText.slice(0, targetText.length - 2);
  return targetText;
};

const getShipmentMode = (text) => {
  let shipmentKeyword = text.indexOf("Shipment by:");
  if (shipmentKeyword) {
    let shipmentEnd = text.indexOf("\n", shipmentKeyword + 12);
    return text.slice(shipmentKeyword + 12, shipmentEnd);
  }
};

const removeText = (text, keyword) => {
  let start = text.indexOf(keyword);
  let end = text.indexOf("\n", start + 1);
  let data = text;
  if (start !== -1) {
    if (start === 0) {
      if (end === -1) {
        end = text.length - 1;
      }
      data = text.slice(end + 1);
    } else {
      if (end === -1) {
        end = text.length - 1;
      }
      let text1 = text.slice(0, start);
      let text2 = text.slice(end + 1);
      data = `${text1} ${text2}`;
    }
  }
  return data;
};

const getConfirmationItems = (text) => {
  let count = 0;
  let itemStart;
  let itemDeliveryDate;
  let itemEndPos;
  let item;
  let data = [];
  let targetDate = getDate(text);
  let targetInvoiceNo = getConfirmationNo(text);
  let targetShipmentMode = getShipmentMode(text);
  while (itemDeliveryDate !== -1 && itemEndPos !== -1) {
    if (count === 0) {
      itemStart = text.indexOf("Total\nEUR") + 10;
    } else {
      itemStart = itemEndPos + 1;
    }
    itemDeliveryDate = text.indexOf("Country of origin:", itemStart);
    if (itemDeliveryDate === -1) break;
    itemEndPos = text.indexOf("\n", itemDeliveryDate + 17);
    itemEndPos = text.indexOf("\n", itemEndPos + 1);
    if (itemEndPos === -1) break;
    item = text.slice(itemStart, itemEndPos);
    item = removeItemHeader(item);
    item = item.trim();
    let orderNoPos = item.indexOf("Order No.");
    if (orderNoPos > 0) {
      item = item.slice(orderNoPos);
    }
    item = removeText(item, "Country of origin:");
    item = removeText(item, "HS-Code:");
    item = removeText(item, "Total net value");
    let referenceNoEnd = item.indexOf("\n");
    let referenceNo = item.slice(10, referenceNoEnd);
    referenceNo = referenceNo.trim();
    item = item.slice(referenceNoEnd + 1);
    let orderNoStartPos = item.indexOf("P/O No.:");
    let orderNoEndPos = item.indexOf("\n", orderNoStartPos + 1);
    let orderNo = item.slice(orderNoStartPos + 8, orderNoEndPos).trim();
    item = removeText(item, "P/O No.:");
    let itemArray = item.split("\n");
    if (item[item.length - 1] === "/") {
      itemArray.pop();
    }
    let desc = "";
    let partNo = "";
    let Quantity = "";
    let unit = "";
    let totalValue = "";
    itemArray.map((data) => {
      if (
        (data.includes("pc.") || data.includes("m") || data.includes("Set")) &&
        (data.includes("no") || data.includes("yes"))
      ) {
        desc = desc;
        partNo = data.trim();
        if (data.includes("pc.")) {
          partNo = checkEndOfNumber(data, 0).text.trim();
          unit = "pc";
          totalValue = data.indexOf("pc.");
          totalValue = data.slice(totalValue + 3);
          totalValue = checkEndOfNumber(totalValue, 0).text.trim();
          totalValue = replaceAllChar(totalValue, ".", "");
          totalValue = replaceAllChar(totalValue, ",", ".");
        } else if (data.includes(" m")) {
          partNo = checkEndOfNumber(data, 0).text.trim();
          unit = "m";
          totalValue = data.indexOf(" m");
          totalValue = data.slice(totalValue + 2);
          totalValue = checkEndOfNumber(totalValue, 0).text.trim();
          totalValue = replaceAllChar(totalValue, ".", "");
          totalValue = replaceAllChar(totalValue, ",", ".");
        } else if (data.includes("Set")) {
          partNo = checkEndOfNumber(data, 0).text.trim();
          unit = "set";
          totalValue = data.indexOf("Set");
          totalValue = data.slice(totalValue + 3);
          totalValue = checkEndOfNumber(totalValue, 0).text.trim();
          totalValue = replaceAllChar(totalValue, ".", "");
          totalValue = replaceAllChar(totalValue, ",", ".");
        }
        if (data.includes("no")) {
          Quantity = data.indexOf("no");
          Quantity = data.slice(Quantity + 2);
          Quantity = checkEndOfNumber(Quantity, 0).text.trim();
          Quantity = replaceAllChar(Quantity, ",", ".");
        } else if (data.includes("yes")) {
          Quantity = data.indexOf("yes");
          Quantity = data.slice(Quantity + 3);
          Quantity = checkEndOfNumber(Quantity, 0).text.trim();
          Quantity = replaceAllChar(Quantity, ",", ".");
        }
      } else {
        desc += " " + data.trim();
      }
    });
    let descArray = desc.split("/");
    let descStartIndex = descArray.length / 2;
    desc = descArray.slice(descStartIndex).join("/").trim();

    data.push({
      // item,
      // itemArray,
      targetDate,
      targetInvoiceNo,
      targetShipmentMode,
      referenceNo,
      orderNo,
      desc,
      partNo,
      Quantity,
      unit,
      totalValue,
    });
    count++;
  }

  return data;
};

const removeItemHeader = (text) => {
  let data = text;
  let headerPos = text.indexOf("Invoice No.");
  if (headerPos !== -1) {
    let targetStart = headerPos;
    let targetEnd = text.indexOf("Total\nEUR");
    if (targetEnd !== -1) {
      if (targetStart === 0) {
        data = text.slice(targetEnd + 10);
      } else {
        let text1 = text.slice(0, targetStart - 1);
        let text2 = text.slice(targetEnd + 10);
        data = `${text1}\n${text2}`;
      }
    }
  }
  return data;
};

module.exports = { pdfAnalysis };
