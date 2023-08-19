const { request } = require('http');
const sql = require('mssql');
const { type } = require('os');
const { exitCode } = require('process');
const url = require('url');
const config = require('../config');



const getAllOrder_Confirmation = (req,res) => {
    var query = 'SELECT * FROM Order_Confirmation';
    let { cond, limit, fullquery } = req.query;
    if (limit) {
        query = 'SELECT TOP ' + limit + ' * FROM Order_Confirmation'
    } else {
        query = 'SELECT * FROM Order_Confirmation'
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



const getOrder_Confirmation = (req,res) => {
    var query = 'SELECT * FROM Order_Confirmation';
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



const addOrder_Confirmation = (req,res) => {
    var getquery = "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('Order_Confirmation')";
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
            var query = "INSERT INTO Order_Confirmation Values( "
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



const updateOrder_Confirmation = (req,res) => {
    var getquery = "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('Order_Confirmation')";
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
            var query = "UPDATE Order_Confirmation SET "
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



const deleteOrder_Confirmation = (req,res) => {
    // var query = 'SELECT * FROM Order_Confirmation';
    // console.log(query);
    const { data1, data2 } = req.body;
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        //Read Sql Statment From File
        request.query("DELETE FROM Order_Confirmation " +
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
    getAllOrder_Confirmation,
    getOrder_Confirmation,
    addOrder_Confirmation,
    updateOrder_Confirmation,
    deleteOrder_Confirmation
}