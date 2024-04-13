/**
* @swagger
* components:
*   schemas:
*    Stocks_Items_Status:
*      type: object
*      required:
*        - Item
*        - DATE
*        - Increased
*        - Decreased
*        - Code
*        - Sab_Code
*        - Unit
*      properties:
*        Item:
*          type: string
*          description: Item
*        DATE:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: DATE
*        Increased:
*          type: number
*          description: Increased
*        Decreased:
*          type: number
*          description: Decreased
*        Code:
*          type: string
*          description: Code
*        Sab_Code:
*          type: string
*          description: Sab_Code
*        Unit:
*          type: string
*          description: Unit
*/

/**
*  @swagger
* tags:
*   name: Stocks_Items_Status
*   description: Stocks_Items_Status Table API
* /api/v1/Stocks_Items_Status:
*   get:
*     summary: List All Stocks_Items_Status Table
*     tags: [Stocks_Items_Status]
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
*           example: "SELECT * FROM Stocks_Items_Status WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Stocks_Items_Status Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Stocks_Items_Status'
*   post:
*     summary: Create New Stocks_Items_Status
*     tags: [Stocks_Items_Status]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Stocks_Items_Status'
*     responses:
*       200:
*         description: The Created Stocks_Items_Status.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Items_Status'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Stocks_Items_Status/{ID}:
*   get:
*     summary: Get The Stocks_Items_Status Row by id
*     tags: [Stocks_Items_Status]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Stocks_Items_Status id
*     responses:
*       200:
*         description: The Stocks_Items_Status response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Items_Status'
*   put:
*     summary: Update The Stocks_Items_Status by id
*     tags: [Stocks_Items_Status]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Stocks_Items_Status id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Stocks_Items_Status'
*     responses:
*       200:
*         description: The Stocks_Items_Status Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Items_Status'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Stocks_Items_Status Row by id
*     tags: [Stocks_Items_Status]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Stocks_Items_Status id
*     responses:
*       200:
*         description: The Stocks_Items_Status response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Stocks_Items_Status'
*/

const express = require('express');
const router = express.Router();
const {getAllStocks_Items_Status} = require('../controllers/Stocks_Items_Status')
const {getStocks_Items_Status} = require('../controllers/Stocks_Items_Status')
const {addStocks_Items_Status} = require('../controllers/Stocks_Items_Status')
const {updateStocks_Items_Status} = require('../controllers/Stocks_Items_Status')
const {deleteStocks_Items_Status} = require('../controllers/Stocks_Items_Status')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllStocks_Items_Status)

router.get('/:id', getStocks_Items_Status)

router.post('/', addStocks_Items_Status)

router.put('/:id', updateStocks_Items_Status)

router.delete('/:id', deleteStocks_Items_Status)

module.exports = router