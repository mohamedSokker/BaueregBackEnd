const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getUnrecievedInv = async (req, res) => {
  try {
    const bodyData = req.body;
    let result = [];
    if (model["Recieved_Invoices"]) {
      result = model["Recieved_Invoices"].filter(
        (item) => item.Received_Date === null
      );
    } else {
      const query = `SELECT Invoices FROM Recieved_Invoices WHERE Received_Date IS NULL`;
      result = (await getData(query)).recordsets[0];
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUnrecievedInv };
