const xlsx = require("xlsx");
const fs = require("fs");

const readExcel = async (req, res) => {
  try {
    const { path, sheet } = req.query;
    const workbook = xlsx.readFile(path);

    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    let data = {};
    jsonData.map((d) => {
      data = data[d.Title]
        ? { ...data, [d.Title]: [...data[d.Title], d.Task] }
        : { ...data, [d.Title]: [d.Task] };

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
