const { getAllData } = require("../../../services/mainService");

const maintStocks = async (req, res) => {
  try {
    const maintStocksData = await getAllData("Maintenance_Stocks");

    return res.status(200).json(maintStocksData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintStocks };
