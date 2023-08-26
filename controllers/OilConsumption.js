const { request } = require("http");
const sql = require("mssql");
const { type } = require("os");
const { exitCode } = require("process");
const url = require("url");
const config = require("../config");

function replaceAllChar(string, char1, char2) {
  while (string.includes(char1)) {
    string = string.replace(char1, char2);
  }
  return string;
}

const getAllOilConsumption = (req, res) => {
  var query = "SELECT * FROM OilConsumption";
  let { cond, limit, fullquery } = req.query;
  if (limit) {
    query = "SELECT TOP " + limit + " * FROM OilConsumption";
  } else {
    query = "SELECT * FROM OilConsumption";
  }
  if (cond) {
    // cond = url.parse(cond,true)
    query = query + " WHERE " + cond;
    query = replaceAllChar(query, "%20", " ");
    query = replaceAllChar(query, "%23", "#");
    query = replaceAllChar(query, "%26", "&");
    query = replaceAllChar(query, "%25", "%");
    query = replaceAllChar(query, "%22", '"');
    query = replaceAllChar(query, "%28", "(");
    query = replaceAllChar(query, "%29", ")");
  } else if (fullquery) {
    query = fullquery;
    query = replaceAllChar(query, "%20", " ");
    query = replaceAllChar(query, "%23", "#");
    query = replaceAllChar(query, "%26", "&");
    query = replaceAllChar(query, "%25", "%");
    query = replaceAllChar(query, "%22", '"');
    query = replaceAllChar(query, "%28", "(");
    query = replaceAllChar(query, "%29", ")");
  }
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err.message);
      // create Request object
      var request = new sql.Request();
      try {
        request.query(query, function (err, recordsets) {
          if (err) {
            console.log(err.message);
            return res.send(err.message);
          }
          try {
            return res.status(200).send(recordsets.recordsets[0]);
          } catch (error) {
            return res.status(404).send({ message: error.message });
          }
        });
      } catch (error) {
        return res.status(404).send({ message: error.message });
      }
      //Read Sql Statment From File
    });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
  sql.on("error", (err) => {
    res.status(404).send({ message: err.message });
  });
};

const getOilConsumption = (req, res) => {
  var query = "SELECT * FROM OilConsumption";
  // console.log(query);
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    //Read Sql Statment From File
    request.query(query, function (err, recordsets) {
      if (err) console.log(err);
      Results = recordsets.recordsets[0];
      const SearchedItems = Results.find(
        (Result) => Result.ID == Object.values(req.params)[0]
      );
      var SearchedItemsArray = [];
      SearchedItemsArray[0] = SearchedItems;
      res.json(SearchedItemsArray);
    });
  });
};

const addOilConsumption = (req, res) => {
  var getquery =
    "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('OilConsumption')";
  var Results = [];
  // console.log(query);
  sql.connect(config).then(() => {
    // if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    //Read Sql Statment From File
    request.query(getquery, function (err, recordsets) {
      // if (err) console.log(err)
      Results = recordsets.recordsets[0];
      let keysStatus = true;
      var query = "INSERT INTO OilConsumption Values( ";
      const keys = Object.keys(req.body);
      console.log(req.body);
      // var i = 0
      for (let i = 0; i < Results.length; i++) {
        // console.log(Results[i]['name'])
        if (keys.includes(Results[i]["name"])) {
          query += "'" + req.body[Results[i]["name"]] + "',";
        } else if (Results[i]["name"] == "ID") {
          query = query;
        } else {
          keysStatus = false;
          res.status(404).send("Wrong Arguments");
        }
      }
      query = query.slice(0, -1);
      query += ")";
      console.log(query);
      if (keysStatus == true) {
        sql.connect(config, function (err) {
          // if (err) console.log(err);
          // create Request object
          var request = new sql.Request();
          //Read Sql Statment From File
          request.query(query, function (err, recordsets) {
            // if (err) console.log(err)
            res.status(200).send({ success: true, data: req.body });
          });
        });
      }
    });
  });
};

const updateOilConsumption = (req, res) => {
  var getquery =
    "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('OilConsumption')";
  var Results = [];
  var cond = "";
  // console.log(query);
  sql.connect(config).then(() => {
    // if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    //Read Sql Statment From File
    request.query(getquery, function (err, recordsets) {
      // if (err) console.log(err)
      Results = recordsets.recordsets[0];
      let keysStatus = true;
      var query = "UPDATE OilConsumption SET ";
      const keys = Object.keys(req.body);
      console.log(req.body);
      // var i = 0
      for (let i = 0; i < Results.length; i++) {
        // console.log(Results[i]['name'])
        if (keys.includes(Results[i]["name"])) {
          query +=
            Results[i]["name"] + " ='" + req.body[Results[i]["name"]] + "',";
        } else if (Results[i]["name"] == "ID") {
          cond = " WHERE ID = '" + Object.values(req.params)[0] + "'";
        } else {
          keysStatus = false;
          res.status(404).send("Wrong Arguments");
        }
      }
      query = query.slice(0, -1);
      query += cond;
      console.log(query);
      if (keysStatus == true) {
        sql.connect(config, function (err) {
          // if (err) console.log(err);
          // create Request object
          var request = new sql.Request();
          //Read Sql Statment From File
          request.query(query, function (err, recordsets) {
            // if (err) console.log(err)
            res.status(200).send({ success: true, data: req.body });
          });
        });
      }
    });
  });
};

const deleteOilConsumption = (req, res) => {
  // var query = 'SELECT * FROM OilConsumption';
  // console.log(query);
  const { data1, data2 } = req.body;
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    //Read Sql Statment From File
    request.query(
      "DELETE FROM OilConsumption " +
        "WHERE ID = '" +
        Object.values(req.params)[0] +
        "'",
      function (err, recordsets) {
        if (err) console.log(err);
        Results = recordsets.recordsets[0];
        // const SearchedItems = Results.find((Result) => Result.ID == Object.values(req.params)[0])
        // var SearchedItemsArray = []
        // SearchedItemsArray[0] = SearchedItems
        res.status(200).send({ success: true, data: req.body });
      }
    );
  });
};

module.exports = {
  getAllOilConsumption,
  getOilConsumption,
  addOilConsumption,
  updateOilConsumption,
  deleteOilConsumption,
};
