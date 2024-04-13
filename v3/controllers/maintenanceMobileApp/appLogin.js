const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { getData } = require("../../functions/getData");
const { getAllData } = require("../../services/mainService");

const appLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const Results = await getAllData("AppMaintUsers");
    // var query = "SELECT * FROM AppMaintUsers";
    // let Results = await getData(query);
    // Results = Results.recordsets[0];
    const SearchedItems = Results?.find(
      (Result) =>
        Result.UserName == username ||
        Result.Email === username ||
        Result.Phone === username
    );
    if (!SearchedItems)
      return res.status(401).json({ message: `No Found Username in DB` });

    bcrypt.compare(password, SearchedItems["Password"], (err, result) => {
      if (err) return res.status(401).json({ message: err.message });
      if (!result)
        return res.status(401).json({ message: `Password Didn't Match` });

      const user = {
        id: SearchedItems["ID"],
        username: SearchedItems["UserName"],
        role: SearchedItems["Role"],
        img: SearchedItems["ProfileImg"],
        eqtype: SearchedItems["Equipment_Type"],
        Location: SearchedItems["Location"],
        Token: SearchedItems["Token"],
      };
      const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "5000000d",
      });
      return res.status(200).json({ token: token });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { appLogin };
