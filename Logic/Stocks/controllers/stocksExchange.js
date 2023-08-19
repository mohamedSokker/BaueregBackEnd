const { checkIteminStock } = require("../functions/global/checkItemInStock");
const {
  insertToTransition,
  updateNotification,
} = require("../functions/Exchange/InsertToTransition");

const stocksExchange = async (req, res) => {
  try {
    const checkCode = await checkIteminStock(req.body.Code, req.body.ItemFrom);
    if (checkCode !== `no items found` && checkCode !== `Error`) {
      const bodyData = {
        ID: checkCode[0][`ID`],
        UserName: req.body.UserName,
        ProfileImg: req.body.ProfileImg,
        Category: "Stocks",
        Item: req.body.ItemFrom,
        Code: req.body.Code,
        SabCode: checkCode[0][`SabCode`],
        Unit: checkCode[0][`Unit`],
        Description: checkCode[0][`Description`],
        Detail: checkCode[0][`Detail`],
        Quantity: checkCode[0][`Quantity`],
        ItemFrom: req.body.ItemFrom,
        ItemTo: req.body.ItemTo,
        ItemStatus: req.body.ItemStatus,
      };
      const insertTransition = await insertToTransition(bodyData);
      res.status(200).send(insertTransition);
    } else {
      if (checkCode === `no items found`) {
        throw new Error(`no items found`);
        res.status(404).send({ message: `no items found` });
      }

      if (checkCode === `Error`) {
        throw new Error(`Error`);
        res.status(500).send({ message: `Error` });
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { stocksExchange };
