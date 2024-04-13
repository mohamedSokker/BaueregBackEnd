/**
* @swagger
* components:
*   schemas:
*    Order_Number:
*      type: object
*      required:
*        - Date
*        - Quantity
*        - PartNumber
*        - Order_No
*        - Equipment
*        - Unit
*        - Description
*        - Status
*      properties:
*        Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date
*        Quantity:
*          type: number
*          description: Quantity
*        PartNumber:
*          type: number
*          description: PartNumber
*        Order_No:
*          type: string
*          description: Order_No
*        Equipment:
*          type: string
*          description: Equipment
*        Unit:
*          type: string
*          description: Unit
*        Description:
*          type: string
*          description: Description
*        Status:
*          type: string
*          description: Status
*/

/**
*  @swagger
* tags:
*   name: Order_Number
*   description: Order_Number Table API
* /api/v1/Order_Number:
*   get:
*     summary: List All Order_Number Table
*     tags: [Order_Number]
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
*           example: "SELECT * FROM Order_Number WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_Number Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_Number'
*   post:
*     summary: Create New Order_Number
*     tags: [Order_Number]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Number'
*     responses:
*       200:
*         description: The Created Order_Number.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Number'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_Number/{ID}:
*   get:
*     summary: Get The Order_Number Row by id
*     tags: [Order_Number]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Number id
*     responses:
*       200:
*         description: The Order_Number response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Number'
*   put:
*     summary: Update The Order_Number by id
*     tags: [Order_Number]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_Number id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Number'
*     responses:
*       200:
*         description: The Order_Number Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Number'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_Number Row by id
*     tags: [Order_Number]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Number id
*     responses:
*       200:
*         description: The Order_Number response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Number'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_Number} = require('../controllers/Order_Number')
const {getOrder_Number} = require('../controllers/Order_Number')
const {addOrder_Number} = require('../controllers/Order_Number')
const {updateOrder_Number} = require('../controllers/Order_Number')
const {deleteOrder_Number} = require('../controllers/Order_Number')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_Number)

router.get('/:id', getOrder_Number)

router.post('/', addOrder_Number)

router.put('/:id', updateOrder_Number)

router.delete('/:id', deleteOrder_Number)

module.exports = router