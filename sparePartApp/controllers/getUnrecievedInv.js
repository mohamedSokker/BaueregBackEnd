const { getData } = require("../../functions/getData");

const getUnrecievedInv = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `SELECT Invoices FROM Recieved_Invoices WHERE Received_Date IS NULL`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUnrecievedInv };
