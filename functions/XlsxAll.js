const axios = require("axios");
const XLSX = require("xlsx");

const XlsxAll = async (url) => {
  let axiosResponse;
  try {
    const options = {
      method: "get",
      url,
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "PostmanRuntime/7.33.0",
      },
    };
    axiosResponse = await axios(options);
    const workbook = XLSX.read(axiosResponse.data);
    return workbook;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = XlsxAll;
