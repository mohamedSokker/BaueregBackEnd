const XLSX = require("xlsx");
const { model } = require("../../../model/mainModel");
const ExcelDateToJSDate = require("../../../helpers/ExcelToJsDate");
const formatDate = require("../../../helpers/formatdate");

const { validateData } = require("./validate");
const { addManyQuery, addMany } = require("../../../services/mainService");
const {
  EqsToolsLocationSchema,
} = require("../../../schemas/EqsToolsLocation/schema");
const { sheerToJson } = require("../../../helpers/sheetToJson");

const Analyze = async (req, res) => {
  try {
    const basePath = req.body.path;
    const path = `/home/mohamed/bauereg/ToolsUpload${basePath}`;
    // console.log(path);

    const workbook = XLSX.readFile(path, { sheets: ["Sheet1"] });

    const excelData = sheerToJson(workbook.Sheets["Sheet1"]);

    // const excelData = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);

    // console.log(excelData);

    let sites = [];
    let eqs = [];
    model["Equipments_Location"]?.map((item) => {
      if (!sites.includes(item.Location)) sites.push(item.Location);
      if (!eqs.includes(item.Equipment)) eqs.push(item.Equipment);
    });

    model["Location_Bauer"]?.map((item) => {
      if (!sites.includes(item.Location)) sites.push(item.Location);
    });

    // sites = Array.from(new Set(sites));
    // eqs = Array.from(new Set(eqs));

    // sites.push("");

    // console.log(sites);

    // model["Bauer_Equipments"].map((item) => {
    //   eqs.push(item.Equipment);
    // });

    if (!eqs.includes("Spare")) eqs.push("Spare");

    let tools = [];
    model["EqsTools"]?.map((item) => {
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
          ? item.End_Date === "Null"
            ? null
            : formatDate(ExcelDateToJSDate(item.End_Date))
          : "",
        Start_WH: item.Start_WH ? item.Start_WH : "",
        End_WH: item.End_WH
          ? item.End_WH === "Null"
            ? null
            : item.End_WH
          : "",
        Location: item.Location ? item.Location : "",
        Equipment: item.Equipment ? item.Equipment : "",
      });
      dataWithID.push({
        // ...item,
        ID: item.ID ? item.ID : 0,
        Type: item.Type ? item.Type : "",
        Code: item.Code ? item.Code : "",
        Serial: item.Serial ? item.Serial : "",
        Start_Date: item.Start_Date,
        End_Date: item.End_Date
          ? item.End_Date === "Null"
            ? "Null"
            : item.End_Date
          : "",
        Start_WH: item.Start_WH ? item.Start_WH : "",
        End_WH: item.End_WH
          ? item.End_WH === "Null"
            ? "Null"
            : item.End_WH
          : "",
        Location: item.Location ? item.Location : "",
        Equipment: item.Equipment ? item.Equipment : "",
      });
    });

    const validate = await validateData(dataWithID, tools, sites, eqs);

    if (validate.message !== "") throw new Error(validate.message);

    // console.log(data);

    await addMany(data, "EqsToolsLocation", EqsToolsLocationSchema);

    return res.status(200).json({ messgae: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { Analyze };
