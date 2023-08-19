/**
* @swagger
* components:
*   schemas:
*    Stocks_Equipments:
*      type: object
*      required:
*        - Store
*        - Equipment
*      properties:
*        Store:
*          type: string
*          description: Store
*        Equipment:
*          type: string
*          description: Equipment
*/

/**
*  @swagger
* tags:
*   name: Stocks_Equipments
*   description: Stocks_Equipments Table API
* /api/v1/Stocks_Equipments:
*   get:
*     summary: List All Stocks_Equipments Table
*     tags: [Stocks_Equipments]
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
*           example: "SELECT * FROM Stocks_Equipments WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Stocks_Equipments Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Stocks_Equipments'
*   post:
*     summary: Create New Stocks_Equipments
*     tags: [Stocks_Equipments]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Stocks_Equipments'
*     responses:
*       200:
*         description: The Created Stocks_Equipments.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Equipments'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Stocks_Equipments/{ID}:
*   get:
*     summary: Get The Stocks_Equipments Row by id
*     tags: [Stocks_Equipments]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Stocks_Equipments id
*     responses:
*       200:
*         description: The Stocks_Equipments response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Equipments'
*   put:
*     summary: Update The Stocks_Equipments by id
*     tags: [Stocks_Equipments]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Stocks_Equipments id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Stocks_Equipments'
*     responses:
*       200:
*         description: The Stocks_Equipments Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Equipments'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Stocks_Equipments Row by id
*     tags: [Stocks_Equipments]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Stocks_Equipments id
*     responses:
*       200:
*         description: The Stocks_Equipments response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Equipments'
*/

const express = require('express');
const router = express.Router();
const {getAllStocks_Equipments} = require('../controllers/Stocks_Equipments')
const {getStocks_Equipments} = require('../controllers/Stocks_Equipments')
const {addStocks_Equipments} = require('../controllers/Stocks_Equipments')
const {updateStocks_Equipments} = require('../controllers/Stocks_Equipments')
const {deleteStocks_Equipments} = require('../controllers/Stocks_Equipments')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllStocks_Equipments)

router.get('/:id', getStocks_Equipments)

router.post('/', addStocks_Equipments)

router.put('/:id', updateStocks_Equipments)

router.delete('/:id', deleteStocks_Equipments)

module.exports = router