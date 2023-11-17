const { getData } = require("../../../functions/getData");
const { checkItemInStore } = require("../functions/global/checjItemInStore");

const stocksPlaceOrder = async (req, res) => {
  try {
    let query = "";
    let count = 0;
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      const checkCode = await checkItemInStore(req.body[i].Code);
      query += ` INSERT INTO AppPlaceOrder VALUES(
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
    }
    // console.log(query);
    const result = await getData(query);
    return res.status(200).json({ data: result.rowsAffected[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { stocksPlaceOrder };
