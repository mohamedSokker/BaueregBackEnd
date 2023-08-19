// const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
// let { getoldpath } = require("./auth");
// const bcrypt = require("bcrypt");

const loginapp = (req, res) => {
  // let {oldpath} = require('./auth')
  // console.log(getoldpath());
  // console.log(typeof(getoldpath()));
  // const getUser = async(username) => {
  //     return {userid: mohamed, password: sokker, username};
  // };

  const { username, password } = req.body;
  // const hash = bcrypt.hash(password, 10);
  // console.log(req.body);
  const user = { userid: "Eng Wael Khalil", password: "Bauer2023_123" };
  // console.log(user);
  if (user.userid != username || user.password != password) {
    return res.status(403).json({
      error: "invalid login",
    });
  }

  const token = jwt.sign(user, "Bauer", { expiresIn: "24h" });
};

module.exports = loginapp;
