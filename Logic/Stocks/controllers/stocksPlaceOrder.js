const sql = require("mssql");
const config = require("../../../config");

const { checkItemInStore } = require("../functions/global/checjItemInStore");

const stocksPlaceOrder = async (req, res) => {
  try {
    let query = "";
    let count = 0;
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      const checkCode = await checkItemInStore(req.body[i].Code);
      if (checkCode !== `no items found` && checkCode !== `Error`) {
        query = `INSERT INTO AppPlaceOrder VALUES(
        GETDATE(), '${req.body[i].OrderNo}', '${req.body[i].Code}',
        '${checkCode[0]["SabCode"]}', '${checkCode[0]["Unit"]}', '${req.body[i].Quantity}',
        '${checkCode[0]["Description"]}', '${req.body[i].FromStore}', '${req.body[i].ToUser}', 'false')`;
        if (count === 0) {
          query += ` INSERT INTO AppNotification VALUES(
            GETDATE(), '${req.body[i].FromUserName}', '${req.body[i].FromUserImg}',
            '${req.body[i].ToUser}', 'Place Order', '${req.body[i].FromStore}',
            'There are order from ${req.body[i].FromStore} You may want to see',
            'false', 'false')`;
          count++;
        }
        await sql.connect(config);
        const result = await sql.query(query);
      } else {
        return res.status(404).send({ message: "no items found" });
      }
      console.log(query);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
  return res.status(200).send({ message: `Success` });
};

module.exports = { stocksPlaceOrder };
