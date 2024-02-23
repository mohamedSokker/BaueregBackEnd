const fs = require("fs");
const xlsx = require("xlsx");
const writer = fs.createWriteStream(
  `/home/mohamed/bauereg/api/stocksDataNew.js`
);

const { stocksData } = require("./stocksData");

const createData = () => {
  try {
    console.log(__dirname);
    const workbook = xlsx.readFile(`/home/mohamed/Downloads/5.xlsx`);

    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[`Sheet1`]);
    let data = {};
    for (let i = 0; i < jsonData.length; i++) {
      if (
        !stocksData[jsonData[i]?.Code] &&
        !stocksData[jsonData[i]?.Code?.toString()?.split("-")[0]]
      ) {
        if (jsonData[i]?.Code.toString().includes("-")) {
          writer.write(
            `"${jsonData[i]?.Code?.toString()?.split("-")[0]}": "${
              jsonData[i]?.Sab_Code
            }"` +
              ",\n" +
              `"${jsonData[i]?.Code}": "${jsonData[i]?.Sab_Code}"` +
              ",\n"
          );
        } else {
          writer.write(
            `"${jsonData[i]?.Code}": "${jsonData[i]?.Sab_Code}"` + ",\n"
          );
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createData };
