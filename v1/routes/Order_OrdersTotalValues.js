/**
* @swagger
* components:
*   schemas:
*    Order_OrdersTotalValues:
*      type: object
*      required:
*        - Order_Date
*        - OrderNo
*        - Equipment
*        - Total_Values
*      properties:
*        Order_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Order_Date
*        OrderNo:
*          type: string
*          description: OrderNo
*        Equipment:
*          type: string
*          description: Equipment
*        Total_Values:
*          type: string
*          description: Total_Values
*/

/**
*  @swagger
* tags:
*   name: Order_OrdersTotalValues
*   description: Order_OrdersTotalValues Table API
* /api/v1/Order_OrdersTotalValues:
*   get:
*     summary: List All Order_OrdersTotalValues Table
*     tags: [Order_OrdersTotalValues]
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
*           example: "SELECT * FROM Order_OrdersTotalValues WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_OrdersTotalValues Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_OrdersTotalValues'
*   post:
*     summary: Create New Order_OrdersTotalValues
*     tags: [Order_OrdersTotalValues]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_OrdersTotalValues'
*     responses:
*       200:
*         description: The Created Order_OrdersTotalValues.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_OrdersTotalValues'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_OrdersTotalValues/{ID}:
*   get:
*     summary: Get The Order_OrdersTotalValues Row by id
*     tags: [Order_OrdersTotalValues]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_OrdersTotalValues id
*     responses:
*       200:
*         description: The Order_OrdersTotalValues response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_OrdersTotalValues'
*   put:
*     summary: Update The Order_OrdersTotalValues by id
*     tags: [Order_OrdersTotalValues]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_OrdersTotalValues id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_OrdersTotalValues'
*     responses:
*       200:
*         description: The Order_OrdersTotalValues Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_OrdersTotalValues'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_OrdersTotalValues Row by id
*     tags: [Order_OrdersTotalValues]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_OrdersTotalValues id
*     responses:
*       200:
*         description: The Order_OrdersTotalValues response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_OrdersTotalValues'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_OrdersTotalValues} = require('../controllers/Order_OrdersTotalValues')
const {getOrder_OrdersTotalValues} = require('../controllers/Order_OrdersTotalValues')
const {addOrder_OrdersTotalValues} = require('../controllers/Order_OrdersTotalValues')
const {updateOrder_OrdersTotalValues} = require('../controllers/Order_OrdersTotalValues')
const {deleteOrder_OrdersTotalValues} = require('../controllers/Order_OrdersTotalValues')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_OrdersTotalValues)

router.get('/:id', getOrder_OrdersTotalValues)

router.post('/', addOrder_OrdersTotalValues)

router.put('/:id', updateOrder_OrdersTotalValues)

router.delete('/:id', deleteOrder_OrdersTotalValues)

module.exports = router