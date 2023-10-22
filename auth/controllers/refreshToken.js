const jwt = require("jsonwebtoken");
const { getData } = require("../../functions/getData");
const AllTables = require("../../data/allTables");
const AllStocks = require("../../data/allStocks");

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
      const user = {
        username: decoded.username,
        roles: decoded.roles,
        img: decoded.img,
      };
      const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
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

        const query = `SELECT Location FROM Location_Bauer`;
        const sites = await getData(query);
        sites.recordsets[0]?.map((item) => {
          allSitesWithName.push({ name: item.Location });
        });
        const eqQuery = `SELECT Equipment FROM Bauer_Equipments`;
        const eqs = await getData(eqQuery);
        eqs.recordsets[0]?.map((item) => {
          allEqsWithName.push({ name: item.Equipment });
        });
        user.roles.Editor = {
          Dashboard: true,
          Kanban: true,
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
          Catalogues: [],
          OilSamples: true,
          OilSamplesAnalyzed: true,
          ManageUsers: true,
          ManageAppUsers: true,
        };
      }
      return res.status(200).json({ token: token, user: user });
    }
  );
};

module.exports = { handleRefreshToken };
