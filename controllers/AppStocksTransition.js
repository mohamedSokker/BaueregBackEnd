const { request } = require("http");
const sql = require("mssql");
const { type } = require("os");
const { exitCode } = require("process");
const url = require("url");
const config = require("../config");
const mongoose = require("mongoose");

////////////////////////////////////////////////SQL GET ALL//////////////////////////////////////////
const sqlgetAllAppStocksTransition = (req, res) => {
  var query = "SELECT * FROM AppStocksTransition";
  let { cond, limit, fullquery, page } = req.query;
  if (limit) {
    query = "SELECT TOP " + limit + " * FROM AppStocksTransition";
  } else {
    query = "SELECT * FROM AppStocksTransition";
  }
  if (page && limit) {
    let startCount = (page - 1) * limit + 1;
    let endCount = startCount + limit;
    query = `WITH RowNo AS (SELECT ROW_NUMBER() OVER (ORDER BY ID) AS rowno, 
            * FROM AppStocksTransition) SELECT * FROM RowNo WHERE RowNo BETEEN ${startCount} AND  ${endCount}`;
  }
  if (cond) {
    // cond = url.parse(cond,true)
    query = query + " WHERE " + cond;
    query = query.replaceAll("%20", " ");
    query = query.replaceAll("%27", "'");
    query = query.replaceAll("%23", "#");
  } else if (fullquery) {
    query = fullquery;
  }
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      try {
        request.query(query, function (err, recordsets) {
          // if (err) res.send(err)
          try {
            res.status(200).json(recordsets.recordsets[0]);
          } catch (error) {
            res.status(404).send("Wrong Arguments");
          }
        });
      } catch (error) {
        res.status(404).send("Wrong Arguments");
      }
      //Read Sql Statment From File
    });
  } catch (error) {
    res.status(404).send("Wrong Arguments");
  }
  sql.on("error", (err) => {
    res.status(404).send("Wrong Arguments");
  });
};

/////////////////////////////////////////////MONGO DB TRY GET ALL////////////////////////////////////////
const getAllAppStocksTransition = async (req, res) => {
  try {
    mongoose
      .connect(process.env.MONGO_CONN_STR, {
        useNewUrlParser: true,
      })
      .catch((err) => {
        console.log("Mongo Connection Falied");
        sqlgetAllAppStocksTransition(req, res);
      });

    const connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", async () => {
      const collection = connection.db.collection("AppStocksTransition");
      collection
        .find({}, { _id: 0 })
        .toArray()
        .then((data) => {
          res.send(data);
          mongoose.connection.close();
        });
    });
  } catch (err) {
    sqlgetAllAppStocksTransition(req, res);
  }
};

//////////////////////////////////SQL GET One///////////////////////////////////////////////////////

const sqlgetAppStocksTransition = (req, res) => {
  var query = "SELECT * FROM AppStocksTransition";
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

//////////////////////////////////////Mongo DB Try GET One////////////////////////////////////////////

const getAppStocksTransition = (req, res) => {
  try {
    mongoose
      .connect(process.env.MONGO_CONN_STR, {
        useNewUrlParser: true,
      })
      .catch((err) => {
        console.log("Mongo Connection Falied");
        sqlgetAppStocksTransition(req, res);
      });

    const connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", async () => {
      const collection = connection.db.collection("AppStocksTransition");
      console.log(Object.values(req.params)[0]);
      collection
        .find({ ID: Number(Object.values(req.params)[0]) }, { _id: 0 })
        .toArray()
        .then((data) => {
          res.send(data);
          mongoose.connection.close();
        });
    });
  } catch (err) {
    console.log("Error");
    sqlgetAppStocksTransition(req, res);
  }
};

/////////////////////////////////Mongo DB POST/////////////////////////////////////////////////

const addAppStocksTransition = (req, res) => {
  var getquery =
    "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('AppStocksTransition')";
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
      var query = "INSERT INTO AppStocksTransition Values( ";
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
          break;
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
            sql.connect(config, (err) => {
              let request = new sql.Request();
              request.query(
                "SELECT TOP 1 * FROM AppStocksTransition ORDER BY ID DESC",
                (err, recordsets) => {
                  let sqlData = recordsets.recordsets[0][0];
                  console.log(sqlData);
                  try {
                    mongoose
                      .connect(process.env.MONGO_CONN_STR, {
                        useNewUrlParser: true,
                      })
                      .catch((err) => {
                        console.log("Mongo Connection Falied");
                        res.status(500).send("Server Error");
                        // sqladdAppStocksTransition(req, res);
                      });

                    const connection = mongoose.connection;
                    connection.on(
                      "error",
                      console.error.bind(console, "connection error:")
                    );
                    connection.once("open", async () => {
                      const collection = connection.db.collection(
                        "AppStocksTransition"
                      );
                      console.log(req.body);
                      collection.insertOne(sqlData).then((data) => {
                        mongoose.connection.close();
                        res.status(200).json({ data: sqlData });
                        // sqladdAppStocksTransition(req, res);
                      });
                    });
                  } catch (err) {
                    console.log("Error");
                    res.status(500).send("Server Error");
                    // sqladdAppStocksTransition(req, res);
                  }
                }
              );
            });
            // if (err) console.log(err)
            // res.status(200).send({ success: true, data: req.body });
          });
        });
      }
    });
  });
};

/////////////////////////////////////Mongo DB Update/////////////////////////////////////

const updateAppStocksTransition = (req, res) => {
  var getquery =
    "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('AppStocksTransition')";
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
      var query = "UPDATE AppStocksTransition SET ";
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
          break;
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
            try {
              mongoose
                .connect(process.env.MONGO_CONN_STR, {
                  useNewUrlParser: true,
                })
                .catch((err) => {
                  console.log("Mongo Connection Falied");
                  res.status(500).send("Server Error");
                });

              const connection = mongoose.connection;
              connection.on(
                "error",
                console.error.bind(console, "connection error:")
              );
              connection.once("open", async () => {
                const collection = connection.db.collection(
                  "AppStocksTransition"
                );
                console.log(req.body);
                collection
                  .updateOne(
                    { ID: Number(Object.values(req.params)[0]) },
                    {
                      $set: req.body,
                    }
                  )
                  .then((data) => {
                    mongoose.connection.close();
                    res.status(200).json({ data: req.body });
                  });
              });
            } catch (err) {
              console.log("Error");
              res.status(500).send("Server Error");
            }
          });
        });
      }
    });
  });
};

const deleteAppStocksTransition = (req, res) => {
  // var query = 'SELECT * FROM AppStocksTransition';
  // console.log(query);
  const { data1, data2 } = req.body;
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    //Read Sql Statment From File
    request.query(
      "DELETE FROM AppStocksTransition " +
        "WHERE ID = '" +
        Object.values(req.params)[0] +
        "'",
      function (err, recordsets) {
        if (err) console.log(err);
        try {
          mongoose
            .connect(process.env.MONGO_CONN_STR, {
              useNewUrlParser: true,
            })
            .catch((err) => {
              console.log("Mongo Connection Falied");
              res.status(500).send("Server Error");
            });

          const connection = mongoose.connection;
          connection.on(
            "error",
            console.error.bind(console, "connection error:")
          );
          connection.once("open", async () => {
            const collection = connection.db.collection("AppStocksTransition");
            console.log(req.body);
            collection
              .deleteOne({ ID: Number(Object.values(req.params)[0]) })
              .then((data) => {
                mongoose.connection.close();
                res.status(200).json({ data: req.body });
              });
          });
        } catch (err) {
          console.log("Error");
          res.status(500).send("Server Error");
        }
      }
    );
  });
};

module.exports = {
  getAllAppStocksTransition,
  getAppStocksTransition,
  addAppStocksTransition,
  updateAppStocksTransition,
  deleteAppStocksTransition,
};
