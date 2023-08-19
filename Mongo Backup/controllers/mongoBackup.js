const sql = require("mssql");
const mongoose = require("mongoose");

const config = require("../../config");

const mongoBackup = async (req, res) => {
  const tableName = req.query.tableName;

  let query = `SELECT * FROM ${tableName}`;
  let sqlData = [];

  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      try {
        request.query(query, function (err, recordsets) {
          try {
            sqlData = recordsets.recordsets[0];
            ///////////Mongo/////////////////////////////
            try {
              mongoose
                .connect(process.env.MONGO_CONN_STR, {
                  useNewUrlParser: true,
                })
                .catch((err) => {
                  console.log("Mongo Connection Falied");
                });

              const connection = mongoose.connection;
              connection.on(
                "error",
                console.error.bind(console, "connection error:")
              );
              connection.once("open", async () => {
                if (sqlData.length > 0) {
                  const collection = connection.db.collection(tableName);
                  await collection.insertMany(sqlData).then((data) => {
                    mongoose.connection.close();
                    // console.log(data);
                    res.status(200).json(data);
                  });
                } else {
                  mongoose.connection.close();
                  res.status(200).json({ data: "no Data" });
                }
              });
            } catch (err) {
              console.log("Error");
            }
            // res.status(200).json(recordsets.recordsets[0]);
          } catch (error) {
            res.status(404).send("Wrong Arguments");
          }
        });
      } catch (error) {
        res.status(404).send("Wrong Arguments");
      }
    });
  } catch (error) {
    res.status(404).send("Wrong Arguments");
  }
  sql.on("error", (err) => {
    res.status(404).send("Wrong Arguments");
  });
};

module.exports = { mongoBackup };
