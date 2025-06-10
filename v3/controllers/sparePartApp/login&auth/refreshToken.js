const jwt = require("jsonwebtoken");
// const { getData } = require("../../../../v3/helpers/getData");
const { getAllData } = require("../../../services/mainService");
const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

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
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ message: "Failed From authHeader" });

    const oldToken = authHeader && authHeader.split(" ")[1];
    const oldData = await getTokenData(oldToken);

    let Results = [];
    if (model["AdminUsersApp"]) {
      Results = model["AdminUsersApp"].filter(
        (user) => user.UserName === oldData.username
      );
    } else {
      var query = `SELECT TOP 1 * FROM AdminUsersApp WHERE UserName = '${oldData.username}'`;
      getData(query).then((result) => {
        Results = result.recordsets[0];
      });
    }
    // const allUsers = await getAllData("AdminUsersApp");
    // const Results = allUsers.filter(
    //   (user) => user.UserName === oldData.username
    // );

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
