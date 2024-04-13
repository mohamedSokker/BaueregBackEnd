const jwt = require("jsonwebtoken");
const { getData } = require("../../../../v3/helpers/getData");
// const AllTables = require("../../../data/allTables");
// const AllStocks = require("../../../data/allStocks");

const getTokenData = async (token) => {
  try {
    const parts = token
      .split(".")
      .map((part) =>
        Buffer.from(
          part.replace(/-/g, "+").replace(/_/g, "/"),
          "base64"
        ).toString()
      );
    const payload = JSON.parse(parts[1]);
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }

  // console.log("JWT payload", payload.roles);
};

const handleRefreshToken = async (req, res) => {
  //   const cookies = req.cookies;
  //   if (!cookies?.jwt)
  //     return res.status(401).json({ message: `Failed because no cookie` });
  //   const refreshToken = cookies.jwt;

  // find user with refresh token in users table in database

  //   jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
  //     if (err)
  //       return res
  //         .status(403)
  //         .json({ message: `Failed from verifing refresh token` });
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ message: "Failed From authHeader" });

    const oldToken = authHeader && authHeader.split(" ")[1];
    const oldData = await getTokenData(oldToken);
    console.log(`oldData => ${JSON.stringify(oldData)}`);
    var query = `SELECT TOP 1 * FROM AdminUsersApp WHERE UserName = '${oldData.username}'`;
    let Results = await getData(query);
    Results = Results.recordsets[0];

    // console.log(`Refresh Result => ${JSON.stringify(Results)}`);

    const tokenUser = {
      username: Results[0]["UserName"],
      // roles: decoded.roles,
      img: Results[0]["ProfileImg"],
    };
    // console.log(Results[0]["UserRole"]);
    const user = {
      username: Results[0]["UserName"],
      roles: JSON.parse(Results[0]?.UserRole),
      img: Results[0]["ProfileImg"],
    };
    const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token: token, user: user });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
  //   });
};

module.exports = { handleRefreshToken };
