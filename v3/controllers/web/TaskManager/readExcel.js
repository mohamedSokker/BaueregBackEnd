const xlsx = require("xlsx");
const path = require("path");
const { sheerToJson } = require("../../../helpers/sheetToJson");

const MCFilePath = `${path.join(
  __dirname,
  "..",
  "..",
  "..",
  "files",
  "/TaskManagerTasks"
)}/YardInspection/MC.xlsx`;
const BGFilePath = `${path.join(
  __dirname,
  "..",
  "..",
  "..",
  "files",
  "/TaskManagerTasks"
)}/YardInspection/BG.xlsx`;

const readExcel = (req, res) => {
  const filePath =
    req.body.type === "MC" || req.body.type === "BC" ? MCFilePath : BGFilePath;
  const sheet = req.body.sheet;
  try {
    const workbook = xlsx.readFile(filePath);

    const jsonData = sheerToJson(workbook.Sheets[sheet]);
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
