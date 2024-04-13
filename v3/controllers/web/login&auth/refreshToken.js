const jwt = require("jsonwebtoken");
// const { getData } = require("../../../v3/helpers/getData");
const { getAllData } = require("../../../services/mainService");
const AllTables = require("../../../../v3/data/allTables");
const AllStocks = require("../../../../v3/data/allStocks");
const { dataEntry } = require("../../../data/dataentry");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ message: `Failed because no cookie` });
  const refreshToken = cookies.jwt;

  // find user with refresh token in users table in database

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ message: `Failed from verifing refresh token` });
      try {
        const tokenUser = {
          username: decoded.username,
          // roles: decoded.roles,
          img: decoded.img,
        };
        // var query = `SELECT TOP 1 * FROM AdminUsersApp WHERE UserName = '${decoded.username}'`;
        // let Results = await getData(query);
        // Results = Results.recordsets[0];
        const allUsers = await getAllData("AdminUsersApp");
        Results = allUsers.filter((user) => user.UserName === decoded.username);
        const user = {
          username: decoded.username,
          title: Results[0]["Title"],
          department: Results[0]["Department"],
          roles: JSON.parse(Results[0]["UserRole"]),
          img: decoded.img,
        };
        const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET_KEY, {
          expiresIn: "1h",
        });
        if (user.roles.Admin) {
          let allTablesWithName = [];
          let allStocksWithName = [];
          let allEqsWithName = [];
          let allSitesWithName = [];

          AllTables.map((table) => {
            allTablesWithName.push({ name: table });
          });

          AllStocks.map((stock) => {
            allStocksWithName.push({ name: stock });
          });

          //   const query = `SELECT Location FROM Location_Bauer`;
          //   const sites = await getData(query);
          const sites = await getAllData("Location_Bauer");
          sites?.map((item) => {
            allSitesWithName.push({ name: item.Location });
          });
          //   const eqQuery = `SELECT Equipment FROM Bauer_Equipments`;
          //   const eqs = await getData(eqQuery);
          const eqs = await getAllData("Bauer_Equipments");
          eqs?.map((item) => {
            allEqsWithName.push({ name: item.Equipment });
          });
          user.roles.Editor = {
            Dashboard: true,
            Kanban: true,
            Transportations: true,
            Sites: allSitesWithName,
            Equipments: allEqsWithName,
            Orders: [
              { name: "Order" },
              { name: "Quotation" },
              { name: "Confirmation" },
              { name: "Invoice" },
            ],
            Stocks: [
              { name: "Barcode Generation" },
              { name: "Barcode Reader" },
              { name: "Stock Order" },
              { name: "Stocks Consumption" },
            ],
            StocksList: allStocksWithName,
            Tables: allTablesWithName,
            DataEntry: dataEntry,
            Catalogues: [],
            OilSamples: true,
            OilSamplesAnalyzed: true,
            ManageUsers: true,
            ManageAppUsers: true,
          };
        }
        return res.status(200).json({ token: token, user: user });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  );
};

module.exports = { handleRefreshToken };
