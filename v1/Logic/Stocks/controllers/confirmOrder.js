const { getData } = require("../../../../v3/helpers/getData");
const { getMainTokens } = require("../functions/global/getMainTokens");
const { sendMessage } = require("../functions/global/sendMessage");

const confirmOrder = async (req, res) => {
  try {
    let query = "";
    let count = 0;
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      query += ` UPDATE AppPlaceOrder SET Quantity='${req.body[i].Quantity}', Confirmed = 'true'
        WHERE ID = '${req.body[i].ID}'`;
      if (count === 0) {
        query += ` INSERT INTO AppNotification VALUES(
              GETDATE(), '${req.body[i].FromUserName}', '${req.body[i].FromUserImg}',
             '${req.body[i].ToUser}', 'Place Order', 'Order Confiremed', 'Check Order ${req.body[i].OrderNo} Confirmed',
             'false', 'false')`;
        count++;
      }
    }
    console.log(query);
    const tokens = await getMainTokens();
    const result = await getData(query);
    await sendMessage(
      {
        title: req.body[0].title,
        body: req.body[0].body,
      },
      tokens
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { confirmOrder };
