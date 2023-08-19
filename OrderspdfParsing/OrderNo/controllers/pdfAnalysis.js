const fs = require("fs");
const path = require("path");
const pdfDoc = require("pdf-lib");
const pdf = require("pdf-parse");
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();

const pdfAnalysis = async (req, res) => {
  const path = req.query.filepath;
  let data = "";
  if (fs.existsSync(path)) {
    const extracted = extractor.extract(path);
    extracted.then((doc) => {
      data = doc.getBody();
      data = removeText(data, "\t\t\t\t\t\t");
      let item = getConfirmationItems(data);
      res.send(item);
    });
  } else {
    res.sendStatus(404);
  }
};

const checkEndOfString = (text, startIndex) => {
  let i = 0;
  for (i = 0; i < text.length; i++) {
    if (!isNaN(text[i]) && text[i] !== " ") {
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
  let dateStart = text.indexOf("\n", dateKeyword + 5);
  dateStart = text.slice(dateKeyword + 5).trim();
  dateStart = checkEndOfString(dateStart, 0).endIndex;
  let dateEnd = text.indexOf("\n", dateKeyword + 6 + dateStart);
  dateStart = text.slice(dateKeyword + 6 + dateStart, dateEnd).trim();
  let dateStartArray = dateStart.split("-");
  let yearDate = dateStartArray[2];
  if (dateStartArray[2].length === 3) {
    yearDate = `2${dateStartArray[2]}`;
  }
  dateStart = `${yearDate}-${dateStartArray[1]}-${dateStartArray[0]}`;
  return dateStart;
};

const getOrderNo = (text) => {
  let confirmKeyword = text.indexOf("Order No.");
  confirmStart = confirmKeyword + 10;
  let confirmEnd = text.indexOf("\t", confirmKeyword + 10);
  let targetText = text.slice(confirmStart, confirmEnd).trim();
  return targetText;
};

const getEq = (text) => {
  let EqKeyword = text.indexOf("Equipment:");
  let EqStart = EqKeyword + 10;
  let EqEnd = text.indexOf("\t", EqStart);
  let targetText = text.slice(EqStart, EqEnd).trim();
  return targetText;
};

const removeText = (text, keyword) => {
  let start = text.indexOf(keyword);
  let end = text.indexOf("\n", start + 1);
  let data = text;
  if (start !== -1) {
    if (start === 0) {
      end = text.length - 1;
      data = text.slice(end + 1);
    } else {
      end = text.length - 1;
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
  let OrderNo = getOrderNo(text);
  let Eq = getEq(text);
  while (itemDeliveryDate !== -1 && itemEndPos !== -1) {
    if (count === 0) {
      itemStart = text.indexOf("Id-No.") + 6;
      itemStart = text.indexOf("\n", itemStart) + 1;
    } else {
      itemStart = itemEndPos + 1;
    }
    itemDeliveryDate = text.indexOf("\n", itemStart);
    if (itemDeliveryDate === -1) break;
    itemEndPos = text.indexOf("\n", itemStart + 1);
    if (itemEndPos === -1) break;
    item = text.slice(itemStart, itemEndPos);
    let itemArray = item.split("\t");
    let Quantity = itemArray[1];
    let unit = itemArray[2];
    let desc = itemArray[3];
    desc = desc.replace(/\s\s+/g, " ");
    let partNo = itemArray[4];
    data.push({
      targetDate,
      OrderNo,
      Eq,
      desc,
      partNo,
      Quantity,
      unit,
    });
    count++;
  }

  return data;
};

module.exports = { pdfAnalysis };
