const AxiosXlsx = require("../../functions/AxiosXlsx");
const XlsxAll = require("../../functions/XlsxAll");
const XLSX = require("xlsx");

const { readExcel } = require("../../functions/readExcel");

const oneDriveEndPoints = (app) => {
  app.get("/api/v1/excel/:id", async (req, res) => {
    try {
      const sheet = req.params.id;
      const url = process.env.ONEDRIVE_URL;
      const result = await AxiosXlsx(url, sheet);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ messages: error.message });
    }
  });

  app.get("/api/v1/consumptions", async (req, res) => {
    try {
      const url = process.env.CONSUMPTON_ONEDRIVE_URL;
      const result = await XlsxAll(url);
      const data = XLSX.utils.sheet_to_json(result.Sheets[`Oil Consumption`]);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ messages: error.message });
    }
  });

  app.get("/readExcel", readExcel);
};

module.exports = { oneDriveEndPoints };
