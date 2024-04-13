const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const { getData } = require("../../../../v3/helpers/getData");
const { getAllData } = require("../../../services/mainService");

const loginapp = async (req, res) => {
  try {
    const { username, password } = req.body;
    // var query = "SELECT * FROM AdminUsersApp";
    // let Results = await getData(query);
    // Results = Results.recordsets[0];
    const Results = await getAllData("AdminUsersApp");
    const SearchedItems = Results?.find(
      (Result) => Result.UserName == username
    );
    if (!SearchedItems)
      return res.status(401).json({ message: `No Found Username in DB` });
    bcrypt.compare(password, SearchedItems["Password"], async (err, result) => {
      if (err) return res.status(401).json({ message: err.message });
      if (!result)
        return res.status(401).json({ message: `Password Didn't Match` });
      const Tokenuser = {
        username: username,
        // roles: JSON.parse(SearchedItems["UserRole"]),
        img: SearchedItems["ProfileImg"],
      };
      const user = {
        id: SearchedItems["ID"],
        username: username,
        roles: JSON.parse(SearchedItems["UserRole"]),
        img: SearchedItems["ProfileImg"],
      };

      const token = jwt.sign(Tokenuser, process.env.TOKEN_SECRET_KEY, {
        expiresIn: `1h`,
      });
      return res.status(200).json({ token: token, user: user });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginapp;
