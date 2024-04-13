/**
* @swagger
* components:
*   schemas:
*    Order_Invoice:
*      type: object
*      required:
*        - Date
*        - InvoiceNo
*        - OrderNo
*        - ItemNo
*        - Quantity
*        - Total_EURO
*        - ReferenceNo
*        - Description
*        - Unit
*        - ShipmentMode
*      properties:
*        Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date
*        InvoiceNo:
*          type: number
*          description: InvoiceNo
*        OrderNo:
*          type: number
*          description: OrderNo
*        ItemNo:
*          type: number
*          description: ItemNo
*        Quantity:
*          type: number
*          description: Quantity
*        Total_EURO:
*          type: number
*          description: Total_EURO
*        ReferenceNo:
*          type: string
*          description: ReferenceNo
*        Description:
*          type: string
*          description: Description
*        Unit:
*          type: string
*          description: Unit
*        ShipmentMode:
*          type: string
*          description: ShipmentMode
*/

/**
*  @swagger
* tags:
*   name: Order_Invoice
*   description: Order_Invoice Table API
* /api/v1/Order_Invoice:
*   get:
*     summary: List All Order_Invoice Table
*     tags: [Order_Invoice]
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
*           example: "SELECT * FROM Order_Invoice WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_Invoice Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_Invoice'
*   post:
*     summary: Create New Order_Invoice
*     tags: [Order_Invoice]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Invoice'
*     responses:
*       200:
*         description: The Created Order_Invoice.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Invoice'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_Invoice/{ID}:
*   get:
*     summary: Get The Order_Invoice Row by id
*     tags: [Order_Invoice]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Invoice id
*     responses:
*       200:
*         description: The Order_Invoice response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Invoice'
*   put:
*     summary: Update The Order_Invoice by id
*     tags: [Order_Invoice]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_Invoice id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Invoice'
*     responses:
*       200:
*         description: The Order_Invoice Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Invoice'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_Invoice Row by id
*     tags: [Order_Invoice]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Invoice id
*     responses:
*       200:
*         description: The Order_Invoice response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Invoice'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_Invoice} = require('../controllers/Order_Invoice')
const {getOrder_Invoice} = require('../controllers/Order_Invoice')
const {addOrder_Invoice} = require('../controllers/Order_Invoice')
const {updateOrder_Invoice} = require('../controllers/Order_Invoice')
const {deleteOrder_Invoice} = require('../controllers/Order_Invoice')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_Invoice)

router.get('/:id', getOrder_Invoice)

router.post('/', addOrder_Invoice)

router.put('/:id', updateOrder_Invoice)

router.delete('/:id', deleteOrder_Invoice)

module.exports = router