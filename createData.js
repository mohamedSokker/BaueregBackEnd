const fs = require("fs");
const xlsx = require("xlsx");
const writer = fs.createWriteStream(
  `/home/mohamed/bauereg/api/Constants/equipmentsData.js`
);

const { getData } = require("./functions/getData");

const { stocksData } = require("./stocksData");
const { stocksDesc } = require("./stocksData");

const createData = async () => {
  try {
    // const query = `SELECT * FROM AppStocks`;
    // const jsonData = (await getData(query)).recordsets[0];
    console.log(__dirname);
    const workbook = xlsx.readFile(`/home/mohamed/Downloads/7.xlsx`);
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[`Sheet1`]);
    let data = {};
    for (let i = 0; i < jsonData.length; i++) {
      writer.write(
        `"${jsonData[i].Equipment}": ${jsonData[i][`Year of Manufacturing`]},`
      );
    }
    // for (let i = 0; i < jsonData.length; i++) {
    //   if (
    //     !stocksDesc[jsonData[i]?.Code] &&
    //     !stocksDesc[jsonData[i]?.Code?.toString()?.split("-")[0]]
    //   ) {
    //     if (jsonData[i]?.Code.toString().includes("-")) {
    //       writer.write(
    //         `'${jsonData[i]?.Code?.toString()?.split("-")[0]}': '${
    //           jsonData[i]?.Description
    //         }'` +
    //           ",\n" +
    //           `'${jsonData[i]?.Code}': '${jsonData[i]?.Description}'` +
    //           ",\n"
    //       );
    //     } else {
    //       writer.write(
    //         `'${jsonData[i]?.Code}': '${jsonData[i]?.Description}'` + ",\n"
    //       );
    //     }
    //   }
    // }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createData };
