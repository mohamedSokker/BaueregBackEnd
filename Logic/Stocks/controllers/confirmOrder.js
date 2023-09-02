const { getData } = require("../../../functions/getData");

const confirmOrder = async (req, res) => {
  try {
    let query = "";
    let count = 0;
    for (let i = 0; i < req.body.length; i++) {
      query = `UPDATE AppPlaceOrder SET Quantity='${req.body[i].Quantity}', Confirmed = 'true'
        WHERE ID = '${req.body[i].ID}'`;
      if (count === 0) {
        query += ` INSERT INTO AppNotification VALUES(
              GETDATE(), '${req.body[i].FromUserName}', '${req.body[i].FromUserImg}',
             '${req.body[i].ToUser}', 'Place Order', 'Main', 'Check Order ${req.body[i].OrderNo} Confirmed',
             'false', 'false')`;
        count++;
      }
      const result = await getData(query);
      return res.status(200).json({ data: result.rowsAffected[0] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { confirmOrder };
