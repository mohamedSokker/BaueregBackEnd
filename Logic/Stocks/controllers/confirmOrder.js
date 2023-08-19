const sql = require("mssql");
const config = require("../../../config");

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
      await sql.connect(config);
      const result = await sql.query(query);
      console.log(query);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }

  return res.status(200).send({ message: "Success" });
};

module.exports = { confirmOrder };
