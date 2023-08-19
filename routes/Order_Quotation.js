/**
* @swagger
* components:
*   schemas:
*    Order_Quotation:
*      type: object
*      required:
*        - Date
*        - QuotationNo
*        - PartNo
*        - Quantity
*        - UnitPrice
*        - TotalPrice
*        - OrderNo
*        - Description
*        - Unit
*      properties:
*        Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date
*        QuotationNo:
*          type: number
*          description: QuotationNo
*        PartNo:
*          type: number
*          description: PartNo
*        Quantity:
*          type: number
*          description: Quantity
*        UnitPrice:
*          type: number
*          description: UnitPrice
*        TotalPrice:
*          type: number
*          description: TotalPrice
*        OrderNo:
*          type: string
*          description: OrderNo
*        Description:
*          type: string
*          description: Description
*        Unit:
*          type: string
*          description: Unit
*/

/**
*  @swagger
* tags:
*   name: Order_Quotation
*   description: Order_Quotation Table API
* /api/v1/Order_Quotation:
*   get:
*     summary: List All Order_Quotation Table
*     tags: [Order_Quotation]
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
*           example: "SELECT * FROM Order_Quotation WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_Quotation Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_Quotation'
*   post:
*     summary: Create New Order_Quotation
*     tags: [Order_Quotation]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Quotation'
*     responses:
*       200:
*         description: The Created Order_Quotation.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Quotation'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_Quotation/{ID}:
*   get:
*     summary: Get The Order_Quotation Row by id
*     tags: [Order_Quotation]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Quotation id
*     responses:
*       200:
*         description: The Order_Quotation response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Quotation'
*   put:
*     summary: Update The Order_Quotation by id
*     tags: [Order_Quotation]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_Quotation id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Quotation'
*     responses:
*       200:
*         description: The Order_Quotation Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Quotation'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_Quotation Row by id
*     tags: [Order_Quotation]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Quotation id
*     responses:
*       200:
*         description: The Order_Quotation response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Quotation'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_Quotation} = require('../controllers/Order_Quotation')
const {getOrder_Quotation} = require('../controllers/Order_Quotation')
const {addOrder_Quotation} = require('../controllers/Order_Quotation')
const {updateOrder_Quotation} = require('../controllers/Order_Quotation')
const {deleteOrder_Quotation} = require('../controllers/Order_Quotation')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_Quotation)

router.get('/:id', getOrder_Quotation)

router.post('/', addOrder_Quotation)

router.put('/:id', updateOrder_Quotation)

router.delete('/:id', deleteOrder_Quotation)

module.exports = router