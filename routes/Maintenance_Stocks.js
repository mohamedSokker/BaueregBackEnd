/**
* @swagger
* components:
*   schemas:
*    Maintenance_Stocks:
*      type: object
*      required:
*        - DateTime
*        - Location
*        - Equipment_Type
*        - Equipment_Model
*        - Equipment
*        - Working_Hours
*        - SparePart_Code
*        - SparePart_Quantity
*        - TotalQuantityInStocks
*        - RemainQuantityInStock
*        - TotalValueStock
*      properties:
*        DateTime:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: DateTime
*        Location:
*          type: string
*          description: Location
*        Equipment_Type:
*          type: string
*          description: Equipment_Type
*        Equipment_Model:
*          type: string
*          description: Equipment_Model
*        Equipment:
*          type: string
*          description: Equipment
*        Working_Hours:
*          type: string
*          description: Working_Hours
*        SparePart_Code:
*          type: string
*          description: SparePart_Code
*        SparePart_Quantity:
*          type: string
*          description: SparePart_Quantity
*        TotalQuantityInStocks:
*          type: string
*          description: TotalQuantityInStocks
*        RemainQuantityInStock:
*          type: string
*          description: RemainQuantityInStock
*        TotalValueStock:
*          type: string
*          description: TotalValueStock
*/

/**
*  @swagger
* tags:
*   name: Maintenance_Stocks
*   description: Maintenance_Stocks Table API
* /api/v1/Maintenance_Stocks:
*   get:
*     summary: List All Maintenance_Stocks Table
*     tags: [Maintenance_Stocks]
*     parameters:
*       - in: query
*         name: limit
*         description: Limit The Number of results
*         required: false
*         schema:
*           type: integer
*           example: 1
*       - in: query
*         name: cond
*         description: The Part of Database query comes after WHERE
*         required: false
*         schema:
*           type: string
*           example: "Location = 'Banha'"
*       - in: query
*         name: fullquery
*         description: Database full query
*         required: false
*         schema:
*           type: string
*           example: "SELECT * FROM Maintenance_Stocks WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Maintenance_Stocks Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Maintenance_Stocks'
*   post:
*     summary: Create New Maintenance_Stocks
*     tags: [Maintenance_Stocks]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Maintenance_Stocks'
*     responses:
*       200:
*         description: The Created Maintenance_Stocks.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance_Stocks'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Maintenance_Stocks/{ID}:
*   get:
*     summary: Get The Maintenance_Stocks Row by id
*     tags: [Maintenance_Stocks]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Maintenance_Stocks id
*     responses:
*       200:
*         description: The Maintenance_Stocks response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance_Stocks'
*   put:
*     summary: Update The Maintenance_Stocks by id
*     tags: [Maintenance_Stocks]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Maintenance_Stocks id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Maintenance_Stocks'
*     responses:
*       200:
*         description: The Maintenance_Stocks Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance_Stocks'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Maintenance_Stocks Row by id
*     tags: [Maintenance_Stocks]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Maintenance_Stocks id
*     responses:
*       200:
*         description: The Maintenance_Stocks response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance_Stocks'
*/

const express = require('express');
const router = express.Router();
const {getAllMaintenance_Stocks} = require('../controllers/Maintenance_Stocks')
const {getMaintenance_Stocks} = require('../controllers/Maintenance_Stocks')
const {addMaintenance_Stocks} = require('../controllers/Maintenance_Stocks')
const {updateMaintenance_Stocks} = require('../controllers/Maintenance_Stocks')
const {deleteMaintenance_Stocks} = require('../controllers/Maintenance_Stocks')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllMaintenance_Stocks)

router.get('/:id', getMaintenance_Stocks)

router.post('/', addMaintenance_Stocks)

router.put('/:id', updateMaintenance_Stocks)

router.delete('/:id', deleteMaintenance_Stocks)

module.exports = router