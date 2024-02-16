const xlsx = require("xlsx");

const MCFilePath = `${__dirname}/Inspection/MC.xlsx`;
const BGFilePath = `${__dirname}/Inspection/BG.xlsx`;

const readExcel = (req, res) => {
  const filePath =
    req.body.type === "MC" || req.body.type === "BC" ? MCFilePath : BGFilePath;
  const sheet = req.body.sheet;
  try {
    const workbook = xlsx.readFile(filePath);

    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    let data = {};
    jsonData.map((d) => {
      data = data[d.Title]
        ? {
            ...data,
            [d.Title]: [
              ...data[d.Title],
              {
                Description: d.Description,
                Detail: d.Detail,
                Check: d.Check,
                Remark: d.Remark,
              },
            ],
          }
        : {
            ...data,
            [d.Title]: [
              {
                Description: d.Description,
                Detail: d.Detail,
                Check: d.Check,
                Remark: d.Remark,
              },
            ],
          };

      return data;
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { readExcel };
