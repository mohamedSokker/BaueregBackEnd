const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const { sheerToJson } = require("../../../helpers/sheetToJson");

const readExcel = async (req, res) => {
  try {
    const { sheet } = req.query;
    const file = `${path.join(
      __dirname,
      "..",
      "..",
      "..",
      "/files",
      "/PeriodicMaint",
      "/PeriodicMaint.xlsx"
    )}`;
    const workbook = xlsx.readFile(file);

    if (
      !sheet.startsWith("MC") &&
      !sheet.startsWith("BC") &&
      !sheet.startsWith("BG")
    )
      throw new Error(`No Plan for this Equipment yet`);
    const jsonData = sheerToJson(workbook.Sheets[sheet]);
    let data = {};
    jsonData.map((d) => {
      data = data[d.Title]
        ? {
            ...data,
            [d.Title]: [...data[d.Title], { Task: d.Task, OilType: d.OilType }],
          }
        : { ...data, [d.Title]: [{ Task: d.Task, OilType: d.OilType }] };

      return data;
    });

    // const titles = data.map((d) => {

    // })

    // Display the JSON data
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { readExcel };
