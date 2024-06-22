const fs = require("fs");
const XLSX = require("xlsx");
const { model } = require("../../../model/mainModel");
const ExcelDateToJSDate = require("../../../helpers/ExcelToJsDate");
const formatDate = require("../../../helpers/formatdate");

const { validateData } = require("./validate");
const { addManyQuery, addMany } = require("../../../services/mainService");
const {
  EqsToolsLocationSchema,
} = require("../../../schemas/EqsToolsLocation/schema");

const titleObj = [
  "ID",
  "Type",
  "Code",
  "Serial",
  "Start_Date",
  "End_Date",
  "Start_WH",
  "End_WH",
  "Location",
  "Equipment",
];

const Analyze = async (req, res) => {
  try {
    const basePath = req.body.path;
    const path = `/home/mohamed/bauereg/ToolsUpload${basePath}`;
    console.log(path);

    const workbook = XLSX.readFile(path);

    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);

    let sites = [];
    let eqs = [];
    model["Equipments_Location"].map((item) => {
      sites.push(item.Location);
      eqs.push(item.Equipment);
    });

    sites = Array.from(new Set(sites));
    eqs = Array.from(new Set(eqs));

    // console.log(sites);

    // model["Bauer_Equipments"].map((item) => {
    //   eqs.push(item.Equipment);
    // });

    let tools = [];
    model["EqsTools"].map((item) => {
      tools.push(item.Type);
    });
    tools = Array.from(new Set(tools));

    const data = [];
    const dataWithID = [];
    excelData.map((item) => {
      data.push({
        // ...item,
        Type: item.Type ? item.Type : "",
        Code: item.Code ? item.Code : "",
        Serial: item.Serial ? item.Serial : "",
        Start_Date: formatDate(ExcelDateToJSDate(item.Start_Date)),
        End_Date: item.End_Date
          ? formatDate(ExcelDateToJSDate(item.End_Date))
          : "",
        Start_WH: item.Start_WH ? item.Start_WH : "",
        End_WH: item.End_WH ? item.End_WH : "",
        Location: item.Location ? item.Location : "",
        Equipment: item.Equipment ? item.Equipment : "",
      });
      dataWithID.push({
        // ...item,
        ID: item.ID ? item.ID : 0,
        Type: item.Type ? item.Type : "",
        Code: item.Code ? item.Code : "",
        Serial: item.Serial ? item.Serial : "",
        Start_Date: formatDate(ExcelDateToJSDate(item.Start_Date)),
        End_Date: item.End_Date
          ? formatDate(ExcelDateToJSDate(item.End_Date))
          : "",
        Start_WH: item.Start_WH ? item.Start_WH : "",
        End_WH: item.End_WH ? item.End_WH : "",
        Location: item.Location ? item.Location : "",
        Equipment: item.Equipment ? item.Equipment : "",
      });
    });

    const validate = await validateData(dataWithID, tools, sites, eqs);

    if (validate.message !== "") throw new Error(validate.message);

    await addManyQuery(data, "EqsToolsLocation", EqsToolsLocationSchema);

    return res.status(200).json({ messgae: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { Analyze };
