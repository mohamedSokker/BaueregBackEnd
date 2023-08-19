const { request } = require('http');
const sql = require('mssql');
const { type } = require('os');
const { exitCode } = require('process');
const url = require('url');
const config = require('../config');



const getAllBC1000 = (req,res) => {
    var query = 'SELECT * FROM BC1000';
    let { cond, limit, fullquery } = req.query;
    if (limit) {
        query = 'SELECT TOP ' + limit + ' * FROM BC1000'
    } else {
        query = 'SELECT * FROM BC1000'
    }
    if (cond) {
        // cond = url.parse(cond,true)
        query = query + ' WHERE ' + cond 
        query = query.replaceAll('%20', ' ')
        query = query.replaceAll('%27', '\'')
        query = query.replaceAll('%23', '#')
    } else if (fullquery) {
        query = fullquery
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
                        res.status(200).send(recordsets.recordsets[0])
                    } catch (error) {
                        res.status(404).send('Wrong Arguments')
                    }
                })
            } catch (error) {
                res.status(404).send('Wrong Arguments')
            }
            //Read Sql Statment From File
        });
    } catch (error) {
        res.status(404).send('Wrong Arguments')
    }
    sql.on('error', (err) => {
        res.status(404).send('Wrong Arguments')
    })
}



const getBC1000 = (req,res) => {
    var query = 'SELECT * FROM BC1000';
    // console.log(query);
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        //Read Sql Statment From File
        request.query(query, function (err, recordsets) {
            if (err) console.log(err)
            Results = recordsets.recordsets[0]
            const SearchedItems = Results.find((Result) => Result.ID == Object.values(req.params)[0])
            var SearchedItemsArray = []
            SearchedItemsArray[0] = SearchedItems
            res.json(SearchedItemsArray)
        });
    });
}



const addBC1000 = (req,res) => {
    var getquery = "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('BC1000')";
    var Results = [];
    // console.log(query);
    sql.connect(config).then(() => {
        // if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        //Read Sql Statment From File
        request.query(getquery, function (err, recordsets) {
            // if (err) console.log(err)
            Results = recordsets.recordsets[0]
            let keysStatus = true
            var query = "INSERT INTO BC1000 Values( "
            const keys = Object.keys(req.body)
            console.log(req.body)
            // var i = 0
            for (let i = 0; i < Results.length; i++) {
                // console.log(Results[i]['name'])
                if ((keys.includes(Results[i]['name']))) {
                    query += "'" + req.body[Results[i]['name']] + "',"
                } else if (Results[i]['name'] == 'ID') {
                    query = query
                } else {
                    keysStatus = false
                    res.status(404).send('Wrong Arguments')
                }
            }
            query = query.slice(0, -1)
            query += ")"
            console.log(query)
            if (keysStatus == true) {
                sql.connect(config, function (err) {
                    // if (err) console.log(err);
                    // create Request object
                    var request = new sql.Request();
                    //Read Sql Statment From File
                    request.query(query, function (err, recordsets) {
                        // if (err) console.log(err)
                        res.status(200).send({success: true, data: req.body})
                    });
                    });
            }
        });
    });
}



const updateBC1000 = (req,res) => {
    var getquery = "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('BC1000')";
    var Results = [];
    var cond = '';
    // console.log(query);
    sql.connect(config).then(() => {
        // if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        //Read Sql Statment From File
        request.query(getquery, function (err, recordsets) {
            // if (err) console.log(err)
            Results = recordsets.recordsets[0]
            let keysStatus = true
            var query = "UPDATE BC1000 SET "
            const keys = Object.keys(req.body)
            console.log(req.body)
            // var i = 0
            for (let i = 0; i < Results.length; i++) {
                // console.log(Results[i]['name'])
                if ((keys.includes(Results[i]['name']))) {
                    query += Results[i]['name'] + " ='" + req.body[Results[i]['name']] + "',"
                } else if (Results[i]['name'] == 'ID') {
                    cond = " WHERE ID = '" + Object.values(req.params)[0] + "'"
                } else {
                    keysStatus = false
                    res.status(404).send('Wrong Arguments')
                }
            }
            query = query.slice(0, -1)
            query += cond
            console.log(query)
            if (keysStatus == true) {
                sql.connect(config, function (err) {
                    // if (err) console.log(err);
                    // create Request object
                    var request = new sql.Request();
                    //Read Sql Statment From File
                    request.query(query, function (err, recordsets) {
                        // if (err) console.log(err)
                        res.status(200).send({success: true, data: req.body})
                    });
                    });
            }
        });
    });
}



const deleteBC1000 = (req,res) => {
    // var query = 'SELECT * FROM BC1000';
    // console.log(query);
    const { data1, data2 } = req.body;
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        //Read Sql Statment From File
        request.query("DELETE FROM BC1000 " +
                     "WHERE ID = '" + Object.values(req.params)[0] + "'", function (err, recordsets) {
            if (err) console.log(err)
            Results = recordsets.recordsets[0]
            // const SearchedItems = Results.find((Result) => Result.ID == Object.values(req.params)[0])
            // var SearchedItemsArray = []
            // SearchedItemsArray[0] = SearchedItems
            res.status(200).send({success: true, data: req.body})
        });
    });
}

module.exports = {
    getAllBC1000,
    getBC1000,
    addBC1000,
    updateBC1000,
    deleteBC1000
}