/**
* @swagger
* components:
*   schemas:
*    Orders_TotalValue:
*      type: object
*      required:
*        - YearAndMonth
*        - TotalValue
*      properties:
*        YearAndMonth:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: YearAndMonth
*        TotalValue:
*          type: string
*          description: TotalValue
*/

/**
*  @swagger
* tags:
*   name: Orders_TotalValue
*   description: Orders_TotalValue Table API
* /api/v1/Orders_TotalValue:
*   get:
*     summary: List All Orders_TotalValue Table
*     tags: [Orders_TotalValue]
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
*           example: "SELECT * FROM Orders_TotalValue WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Orders_TotalValue Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Orders_TotalValue'
*   post:
*     summary: Create New Orders_TotalValue
*     tags: [Orders_TotalValue]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Orders_TotalValue'
*     responses:
*       200:
*         description: The Created Orders_TotalValue.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Orders_TotalValue'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Orders_TotalValue/{ID}:
*   get:
*     summary: Get The Orders_TotalValue Row by id
*     tags: [Orders_TotalValue]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Orders_TotalValue id
*     responses:
*       200:
*         description: The Orders_TotalValue response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Orders_TotalValue'
*   put:
*     summary: Update The Orders_TotalValue by id
*     tags: [Orders_TotalValue]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Orders_TotalValue id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Orders_TotalValue'
*     responses:
*       200:
*         description: The Orders_TotalValue Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Orders_TotalValue'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Orders_TotalValue Row by id
*     tags: [Orders_TotalValue]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Orders_TotalValue id
*     responses:
*       200:
*         description: The Orders_TotalValue response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Orders_TotalValue'
*/

const express = require('express');
const router = express.Router();
const {getAllOrders_TotalValue} = require('../controllers/Orders_TotalValue')
const {getOrders_TotalValue} = require('../controllers/Orders_TotalValue')
const {addOrders_TotalValue} = require('../controllers/Orders_TotalValue')
const {updateOrders_TotalValue} = require('../controllers/Orders_TotalValue')
const {deleteOrders_TotalValue} = require('../controllers/Orders_TotalValue')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrders_TotalValue)

router.get('/:id', getOrders_TotalValue)

router.post('/', addOrders_TotalValue)

router.put('/:id', updateOrders_TotalValue)

router.delete('/:id', deleteOrders_TotalValue)

module.exports = router