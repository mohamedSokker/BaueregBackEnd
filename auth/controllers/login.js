const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getData } = require("../../functions/getData");
const AllTables = require("../../data/allTables");
const AllStocks = require("../../data/allStocks");

const loginapp = async (req, res) => {
  try {
    const { username, password } = req.body;
    var query = "SELECT * FROM AdminUsersApp";
    let Results = await getData(query);
    Results = Results.recordsets[0];
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
        username: username,
        roles: JSON.parse(SearchedItems["UserRole"]),
        img: SearchedItems["ProfileImg"],
      };
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
          DataEntry: true,
          Catalogues: [],
          OilSamples: true,
          OilSamplesAnalyzed: true,
          ManageUsers: true,
          ManageAppUsers: true,
        };
      }
      const token = jwt.sign(Tokenuser, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(
        Tokenuser,
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "5000000d",
        }
      );

      // Insert refreshToken to database
      // res.header(
      //   "Access-Control-Allow-Origin",
      //   "http://mhsokker.ddnsfree.com:3000"
      // );
      // res.header("Access-Control-Allow-Credentials", true);
      // res.header("Access-Control-Allow-Headers", "X-Custom-Header");
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 5000000 * 24 * 60 * 60 * 100,
        path: "/",
        secure: true,
        sameSite: "None",
      });
      return res.status(200).json({ token: token, user: user });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginapp;
