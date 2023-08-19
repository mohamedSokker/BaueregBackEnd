// const sql = require("mssql");
// const fs = require("fs");
// const path = require("path");
// const config = require("../config");
// var getquery = (tablename) => {
//   return (
//     "SELECT sys.columns.name as name,sys.types.Name as type from sys.tables " +
//     "INNER JOIN sys.columns " +
//     "ON(sys.tables.object_id = sys.columns.object_id) " +
//     "INNER JOIN sys.types " +
//     "ON(sys.columns.system_type_id = sys.types.system_type_id) " +
//     "WHERE sys.columns.object_id = OBJECT_ID('" +
//     tablename +
//     "') AND sys.types.name <> 'sysname'"
//   );
// };
// let required = (tablename) => {
//   return (
//     "/**" +
//     "\n" +
//     "* @swagger" +
//     "\n" +
//     "* components:" +
//     "\n" +
//     "*   schemas:" +
//     "\n" +
//     "*    " +
//     tablename +
//     ":" +
//     "\n" +
//     "*      type: object" +
//     "\n" +
//     "*      required:" +
//     "\n"
//   );
// };
// let props = "*      properties:" + "\n";
// let fullschemas = "";

// function DetermineType(type) {
//   if (type == "nvarchar" || type == "text") {
//     return "*          type: string" + "\n";
//   } else if (type == "int") {
//     return "*          type: integer" + "\n";
//   } else if (type == "date") {
//     return (
//       "*          type: string" +
//       "\n" +
//       "*          format: date-time" +
//       "\n" +
//       "*          example: '2022-01-02'" +
//       "\n"
//     );
//   } else if (type == "smalldatetime" || type == "datetime") {
//     return (
//       "*          type: string" +
//       "\n" +
//       "*          format: date-time" +
//       "\n" +
//       "*          example: '2022-01-02 13:02:00'" +
//       "\n"
//     );
//   } else if (type == "float" || type == "decimal") {
//     return "*          type: number" + "\n";
//   } else {
//     return "*          type: string" + "\n";
//   }
// }

// // let requires = required('Test');

// let schema = (tablename) => {
//   let requires = required(tablename);
//   sql.connect(config).then(() => {
//     // create Request object
//     var request = new sql.Request();
//     //Read Sql Statment From File
//     request.query(getquery(tablename), function (err, recordsets) {
//       Results = recordsets.recordsets[0];
//       // console.log(Results)

//       for (let i = 0; i < Results.length; i++) {
//         if (Results[i]["name"] == "ID") {
//         } else {
//           requires += "*        - " + Results[i]["name"] + "\n";
//           props +=
//             "*        " +
//             Results[i]["name"] +
//             ":" +
//             "\n" +
//             DetermineType(Results[i]["type"]) +
//             "*          description: " +
//             Results[i]["name"] +
//             "\n";
//         }
//       }
//       fullschemas =
//         requires +
//         props +
//         "*/" +
//         "\n" +
//         "\n" +
//         "/**" +
//         "\n" +
//         "*  @swagger" +
//         "\n" +
//         "* tags:" +
//         "\n" +
//         "*   name: " +
//         tablename +
//         "" +
//         "\n" +
//         "*   description: " +
//         tablename +
//         " Table API" +
//         "\n" +
//         "* /api/v1/" +
//         tablename +
//         ":" +
//         "\n" +
//         "*   get:" +
//         "\n" +
//         "*     summary: List All " +
//         tablename +
//         " Table" +
//         "\n" +
//         "*     tags: [" +
//         tablename +
//         "]" +
//         "\n" +
//         "*     parameters:" +
//         "\n" +
//         "*       - in: query" +
//         "\n" +
//         "*         name: limit" +
//         "\n" +
//         "*         description: Limit The Number of results" +
//         "\n" +
//         "*         required: false" +
//         "\n" +
//         "*         schema:" +
//         "\n" +
//         "*           type: integer" +
//         "\n" +
//         "*           example: 1" +
//         "\n" +
//         "*       - in: query" +
//         "\n" +
//         "*         name: cond" +
//         "\n" +
//         "*         description: The Part of Database query comes after WHERE" +
//         "\n" +
//         "*         required: false" +
//         "\n" +
//         "*         schema:" +
//         "\n" +
//         "*           type: string" +
//         "\n" +
//         "*           example: \"Location = 'Banha'\"" +
//         "\n" +
//         "*       - in: query" +
//         "\n" +
//         "*         name: fullquery" +
//         "\n" +
//         "*         description: Database full query" +
//         "\n" +
//         "*         required: false" +
//         "\n" +
//         "*         schema:" +
//         "\n" +
//         "*           type: string" +
//         "\n" +
//         '*           example: "SELECT * FROM ' +
//         tablename +
//         " WHERE Location= 'Banha'\"" +
//         "\n" +
//         "*     responses:" +
//         "\n" +
//         "*       200:" +
//         "\n" +
//         "*         description: The List Of The " +
//         tablename +
//         " Table" +
//         "\n" +
//         "*         content:" +
//         "\n" +
//         "*           applicattion/json:" +
//         "\n" +
//         "*             schema:" +
//         "\n" +
//         "*               type: array" +
//         "\n" +
//         "*               items:" +
//         "\n" +
//         "*                 $ref: '#/components/schemas/" +
//         tablename +
//         "'" +
//         "\n" +
//         "*   post:" +
//         "\n" +
//         "*     summary: Create New " +
//         tablename +
//         "" +
//         "\n" +
//         "*     tags: [" +
//         tablename +
//         "]" +
//         "\n" +
//         "*     requestBody:" +
//         "\n" +
//         "*       required: true" +
//         "\n" +
//         "*       content:" +
//         "\n" +
//         "*         application/json:" +
//         "\n" +
//         "*           schema:" +
//         "\n" +
//         "*             $ref: '#/components/schemas/" +
//         tablename +
//         "'" +
//         "\n" +
//         "*     responses:" +
//         "\n" +
//         "*       200:" +
//         "\n" +
//         "*         description: The Created " +
//         tablename +
//         "." +
//         "\n" +
//         "*         content:" +
//         "\n" +
//         "*           application/json:" +
//         "\n" +
//         "*             schema:" +
//         "\n" +
//         "*               $ref: '#/components/schemas/" +
//         tablename +
//         "'" +
//         "\n" +
//         "*       404:" +
//         "\n" +
//         "*         description: Wrong Arguments Or not Found" +
//         "\n" +
//         "* /api/v1/" +
//         tablename +
//         "/{ID}:" +
//         "\n" +
//         "*   get:" +
//         "\n" +
//         "*     summary: Get The " +
//         tablename +
//         " Row by id" +
//         "\n" +
//         "*     tags: [" +
//         tablename +
//         "]" +
//         "\n" +
//         "*     parameters:" +
//         "\n" +
//         "*       - in: path" +
//         "\n" +
//         "*         name: ID" +
//         "\n" +
//         "*         schema:" +
//         "\n" +
//         "*           type: string" +
//         "\n" +
//         "*         required: true" +
//         "\n" +
//         "*         description: The " +
//         tablename +
//         " id" +
//         "\n" +
//         "*     responses:" +
//         "\n" +
//         "*       200:" +
//         "\n" +
//         "*         description: The " +
//         tablename +
//         " response by id" +
//         "\n" +
//         "*         content:" +
//         "\n" +
//         "*           apllication/json:" +
//         "\n" +
//         "*             schema:" +
//         "\n" +
//         "*               $ref: '#/components/schemas/" +
//         tablename +
//         "'" +
//         "\n" +
//         "*   put:" +
//         "\n" +
//         "*     summary: Update The " +
//         tablename +
//         " by id" +
//         "\n" +
//         "*     tags: [" +
//         tablename +
//         "]" +
//         "\n" +
//         "*     parameters:" +
//         "\n" +
//         "*       - in: path" +
//         "\n" +
//         "*         name: ID" +
//         "\n" +
//         "*         schema:" +
//         "\n" +
//         "*           type: string" +
//         "\n" +
//         "*           required: true" +
//         "\n" +
//         "*           description: The " +
//         tablename +
//         " id" +
//         "\n" +
//         "*     requestBody:" +
//         "\n" +
//         "*       required: true" +
//         "\n" +
//         "*       content:" +
//         "\n" +
//         "*         application/json:" +
//         "\n" +
//         "*           schema:" +
//         "\n" +
//         "*             $ref: '#/components/schemas/" +
//         tablename +
//         "'" +
//         "\n" +
//         "*     responses:" +
//         "\n" +
//         "*       200:" +
//         "\n" +
//         "*         description: The " +
//         tablename +
//         " Row Was Updated" +
//         "\n" +
//         "*         content:" +
//         "\n" +
//         "*           application/json:" +
//         "\n" +
//         "*             schema:" +
//         "\n" +
//         "*               $ref: '#/components/schemas/" +
//         tablename +
//         "'" +
//         "\n" +
//         "*       404:" +
//         "\n" +
//         "*         description: Wrong Arguments Or not found" +
//         "\n" +
//         "*   delete:" +
//         "\n" +
//         "*     summary: Remove " +
//         tablename +
//         " Row by id" +
//         "\n" +
//         "*     tags: [" +
//         tablename +
//         "]" +
//         "\n" +
//         "*     parameters:" +
//         "\n" +
//         "*       - in: path" +
//         "\n" +
//         "*         name: ID" +
//         "\n" +
//         "*         schema:" +
//         "\n" +
//         "*           type: string" +
//         "\n" +
//         "*         required: true" +
//         "\n" +
//         "*         description: The " +
//         tablename +
//         " id" +
//         "\n" +
//         "*     responses:" +
//         "\n" +
//         "*       200:" +
//         "\n" +
//         "*         description: The " +
//         tablename +
//         " response by id" +
//         "\n" +
//         "*         content:" +
//         "\n" +
//         "*           apllication/json:" +
//         "\n" +
//         "*             schema:" +
//         "\n" +
//         "*               $ref: '#/components/schemas/" +
//         tablename +
//         "'" +
//         "\n" +
//         "*/";

//       let filepath = path.join(__dirname, "../schemas.txt");
//       fs.writeFileSync(filepath, fullschemas, { encoding: "utf-8" });
//       // console.log(fullschemas)
//     });
//   });
// };

// schema("AdminTasks");

// const express = require("express");
// const router = express.Router();

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

// router.get("/", (req, res) => {});

// module.exports = router;
