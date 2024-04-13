const jwt = require("jsonwebtoken");
let abshost = process.env.BASE_URL;
let oldpath = abshost + "/bauereg/share/bauer";

let auth = (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, "Bauer");
    next();
  } catch (err) {
    res.clearCookie("token");
    oldpath = abshost + req.url;
    res.cookie("oldpath", oldpath, {
      httpOnly: true,
      maxAge: 86400000,
    });
    res.redirect("/");
  }
  // console.log(oldpath);
};

let getoldpath = () => {
  return oldpath;
};

module.exports = {
  oldpath,
  getoldpath,
  auth,
};
