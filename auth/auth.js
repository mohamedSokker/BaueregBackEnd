const jwt = require("jsonwebtoken");
// let abshost = "http://mhsokker.ddnsfree.com:5000";
// let oldpath = abshost + "/bauereg/share/bauer";

let authapp = (req, res, next) => {
  // console.log(req.cookies);
  //   const token = req.cookies.token;
  try {
    // const user = jwt.verify(token, "Bauer");
    next();
  } catch (err) {
    // res.clearCookie("token");
    // oldpath = abshost + req.url;
    // res.cookie("oldpath", oldpath, {
    //   httpOnly: true,
    //   maxAge: 86400000,
    // });
    // res.redirect("/");
  }
  // console.log(oldpath);
};

module.exports = {
  oldpath,
  getoldpath,
  authapp,
};
