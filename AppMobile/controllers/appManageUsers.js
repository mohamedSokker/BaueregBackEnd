const { parseURL } = require("../../functions/parseURL");
const { getData } = require("../../functions/getData");
const bcrypt = require("bcrypt");

const getAllmanageUsers = async (req, res) => {
  let query = "";
  const { cond, limit, fullquery, page } = req.query;
  if (limit) {
    query = "SELECT TOP " + limit + " * FROM AppMaintUsers";
  } else {
    query = "SELECT * FROM AppMaintUsers";
  }
  if (page && limit) {
    let startCount = (Number(page) - 1) * Number(limit) + 1;
    let endCount = Number(startCount) + Number(limit) - 1;
    query = `WITH RowNo AS (SELECT ROW_NUMBER() OVER (ORDER BY ID) AS rowno, 
            * FROM AppMaintUsers) SELECT * FROM RowNo WHERE RowNo BETWEEN ${startCount} AND  ${endCount}`;
    parseURL(query);
  }
  if (cond) {
    query = query + " WHERE " + cond;
    parseURL(query);
  } else if (fullquery) {
    query = fullquery;
    parseURL(query);
  }

  try {
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getmanageUsers = async (req, res) => {
  const cond = req.params.id;
  const query = `SELECT * FROM AppMaintUsers WHERE ID = '${cond}'`;
  try {
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addmanageUsers = async (req, res) => {
  const getquery =
    "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('AppMaintUsers')";
  let Results = [];
  try {
    Results = await getData(getquery);
    Results = Results.recordsets[0];
    let keysStatus = true;
    let query = "INSERT INTO AppMaintUsers Values( ";
    const keys = Object.keys(req.body);
    for (let i = 0; i < Results.length; i++) {
      if (keys.includes(Results[i]["name"])) {
        if (Results[i]["name"] == "Password") {
          await bcrypt.hash(req.body[Results[i]["name"]], 10).then((hash) => {
            hashedPassword = hash;
            console.log(hash);
            query += "'" + hashedPassword + "',";
          });
        } else {
          query += "'" + req.body[Results[i]["name"]] + "',";
        }
      } else if (Results[i]["name"] == "ID") {
        query = query;
      } else {
        keysStatus = false;
        res.status(404).send("Wrong Arguments");
        break;
      }
    }
    query = query.slice(0, -1);
    query += ")";
    if (keysStatus === true) {
      const result = await getData(query);
      return res.status(200).json({ success: "true", dataAdded: result });
    } else {
      return res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatemanageUsers = async (req, res) => {
  const getquery =
    "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('AppMaintUsers')";
  let Results = [];
  let cond = " WHERE ID = '" + Object.values(req.params)[0] + "'";
  try {
    Results = await getData(getquery);
    Results = Results.recordsets[0];
    let arrayResult = [];
    Results.map((result) => {
      arrayResult.push(result.name);
      return arrayResult;
    });
    let keysStatus = true;
    var query = "UPDATE AppMaintUsers SET ";
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "Password") {
        query += `${keys[i]} = '${await bcrypt.hash(req.body[keys[i]], 10)}',`;
      } else if (arrayResult.includes(keys[i]) && keys[i] !== "ID") {
        query += keys[i] + " ='" + req.body[keys[i]] + "',";
      } else {
        keysStatus = false;
        res.status(404).send("Wrong Arguments");
        break;
      }
    }
    query = query.slice(0, -1);
    query += cond;
    console.log(query);
    if (keysStatus === true) {
      const result = await getData(query);
      return res.status(200).json({ success: "true", dataUpdated: result });
    } else {
      return res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletemanageUsers = async (req, res) => {
  const query = `DELETE FROM AppMaintUsers WHERE ID = '${
    Object.values(req.params)[0]
  }'`;
  try {
    const result = await getData(query);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllmanageUsers,
  getmanageUsers,
  addmanageUsers,
  updatemanageUsers,
  deletemanageUsers,
};
