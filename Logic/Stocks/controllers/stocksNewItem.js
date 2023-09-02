const sql = require("mssql");
const config = require("../../../config");

const { checkIteminStock } = require("../functions/global/checkItemInStock");
const { updateStore } = require("../functions/NewItem/updateStore");

const stocksNewItem = async (req, res) => {
  const checkCode = await checkIteminAllStocks(req.body.Code);
  try {
    if (checkCode !== `no items found` && checkCode !== `Error`) {
      const bodyData = {
        Code: req.body.Code,
        UserName: req.body.UserName,
        ProfileImg: req.body.ProfileImg,
        Category: "Stocks",
        Item: req.body.ItemTo,
        SabCode: checkCode[0][`SabCode`],
        Unit: checkCode[0][`Unit`],
        Description: checkCode[0][`Description`],
        Detail: checkCode[0][`Detail`],
        Quantity: checkCode[0][`Quantity`],
        ItemTo: req.body.ItemTo,
        ItemStatus: req.body.ItemStatus,
      };
      const insertTransition = await updateStore(bodyData);
      return res.status(200).json(insertTransition);
    } else {
      if (checkCode === `no items found`) {
        throw new Error(`no items found`);
        // return res.status(404).send({ message: `no items found` });
      }

      if (checkCode === `Error`) {
        throw new Error(`Error`);
        // return res.status(500).send({ message: `Error` });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const checkIteminAllStocks = async (code) => {
  let query = `SELECT * FROM AppStocks WHERE Code = '${code}'`;
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    if (result.rowsAffected[0] === 0) return `no items found`;
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    return `Error`;
  }
};

module.exports = { stocksNewItem };
