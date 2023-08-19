// const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
// let { getoldpath } = require("./auth");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const config = require("../../config");

const loginapp = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  var query = "SELECT * FROM AdminUsersApp";
  // console.log(query);
  sql.connect(config, (err) => {
    if (err) {
      console.log(`connection Error => ${err.message}`);
      return res.sendStatus(500);
    }
    // create Request object
    var request = new sql.Request();
    //Read Sql Statment From File
    request.query(query, (err, recordsets) => {
      if (err) console.log(err.message);
      Results = recordsets?.recordsets[0];
      const SearchedItems = Results?.find(
        (Result) => Result.UserName == username
      );
      // console.log(SearchedItems);
      if (SearchedItems) {
        bcrypt.compare(password, SearchedItems["Password"], (err, result) => {
          if (err) return res.sendStatus(401);
          // console.log(SearchedItems["Password"]);
          console.log(result);
          if (result) {
            const user = {
              username: username,
              roles: JSON.parse(SearchedItems["UserRole"]),
              img: SearchedItems["ProfileImg"],
            };
            // console.log(user);
            const token = jwt.sign(user, "Bauer", { expiresIn: "5000000d" });

            res.json({ token: token });
          } else {
            return res.sendStatus(401);
          }
        });
      } else {
        return res.sendStatus(403);
      }
    });
  });
};

module.exports = loginapp;
