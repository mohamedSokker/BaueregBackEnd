/**
* @swagger
* components:
*   schemas:
*    Order_IncompleteItems:
*      type: object
*      required:
*        - Delivery_Date
*        - OrderNo
*        - Equipment
*        - Description
*        - PartNo
*        - Confirmation_Quantity
*        - Invoice_Quantity
*        - UnRecieved_Items
*        - Invoices
*      properties:
*        Delivery_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Delivery_Date
*        OrderNo:
*          type: string
*          description: OrderNo
*        Equipment:
*          type: string
*          description: Equipment
*        Description:
*          type: string
*          description: Description
*        PartNo:
*          type: string
*          description: PartNo
*        Confirmation_Quantity:
*          type: string
*          description: Confirmation_Quantity
*        Invoice_Quantity:
*          type: string
*          description: Invoice_Quantity
*        UnRecieved_Items:
*          type: string
*          description: UnRecieved_Items
*        Invoices:
*          type: string
*          description: Invoices
*/

/**
*  @swagger
* tags:
*   name: Order_IncompleteItems
*   description: Order_IncompleteItems Table API
* /api/v1/Order_IncompleteItems:
*   get:
*     summary: List All Order_IncompleteItems Table
*     tags: [Order_IncompleteItems]
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
*           example: "SELECT * FROM Order_IncompleteItems WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_IncompleteItems Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_IncompleteItems'
*   post:
*     summary: Create New Order_IncompleteItems
*     tags: [Order_IncompleteItems]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_IncompleteItems'
*     responses:
*       200:
*         description: The Created Order_IncompleteItems.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_IncompleteItems'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_IncompleteItems/{ID}:
*   get:
*     summary: Get The Order_IncompleteItems Row by id
*     tags: [Order_IncompleteItems]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_IncompleteItems id
*     responses:
*       200:
*         description: The Order_IncompleteItems response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_IncompleteItems'
*   put:
*     summary: Update The Order_IncompleteItems by id
*     tags: [Order_IncompleteItems]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_IncompleteItems id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_IncompleteItems'
*     responses:
*       200:
*         description: The Order_IncompleteItems Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_IncompleteItems'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_IncompleteItems Row by id
*     tags: [Order_IncompleteItems]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_IncompleteItems id
*     responses:
*       200:
*         description: The Order_IncompleteItems response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_IncompleteItems'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_IncompleteItems} = require('../controllers/Order_IncompleteItems')
const {getOrder_IncompleteItems} = require('../controllers/Order_IncompleteItems')
const {addOrder_IncompleteItems} = require('../controllers/Order_IncompleteItems')
const {updateOrder_IncompleteItems} = require('../controllers/Order_IncompleteItems')
const {deleteOrder_IncompleteItems} = require('../controllers/Order_IncompleteItems')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_IncompleteItems)

router.get('/:id', getOrder_IncompleteItems)

router.post('/', addOrder_IncompleteItems)

router.put('/:id', updateOrder_IncompleteItems)

router.delete('/:id', deleteOrder_IncompleteItems)

module.exports = router