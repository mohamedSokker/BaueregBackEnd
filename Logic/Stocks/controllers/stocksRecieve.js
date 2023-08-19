const {
  checkItemInTransition,
} = require("../functions/global/checkItemInTransition");
const { updateStore } = require("../functions/Recieve/updateStore");
const { checkIteminStock } = require("../functions/global/checkItemInStock");

const stocksRecieve = async (req, res) => {
  try {
    const checkItem = await checkItemInTransition(req.body);
    if (checkItem !== `no items found` && checkItem !== `Error`) {
      const getFromStore = await checkIteminStock(
        checkItem[0][`Code`],
        req.body.ItemFrom
      );
      const bodyData = {
        TransID: checkItem[0][`ID`],
        ID: getFromStore[0][`ID`],
        UserName: req.body.UserName,
        ProfileImg: req.body.ProfileImg,
        Category: "Stocks",
        Item: req.body.ItemTo,
        Code: req.body.Code,
        SabCode: getFromStore[0][`SabCode`],
        Unit: getFromStore[0][`Unit`],
        Description: getFromStore[0][`Description`],
        Detail: getFromStore[0][`Detail`],
        Quantity: getFromStore[0][`Quantity`],
        ItemFrom: req.body.ItemFrom,
        ItemTo: req.body.ItemTo,
        ItemStatus: req.body.ItemStatus,
      };
      const updateStoreData = await updateStore(bodyData);
      res.status(200).send(updateStoreData);
    } else {
      if (checkItem === `no items found`) {
        throw new Error(`no items found`);
        res.status(404).send({ message: `no items found` });
      }

      if (checkItem === `Error`) {
        throw new Error(`Error`);
        res.status(500).send({ message: `Error` });
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { stocksRecieve };
