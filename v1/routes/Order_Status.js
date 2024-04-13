/**
* @swagger
* components:
*   schemas:
*    Order_Status:
*      type: object
*      required:
*        - Notes
*        - Order_Date
*        - Quotation
*        - Confirmation
*        - Invoice
*        - Recieved
*        - Calculated_Status
*        - Order_Number
*        - Equipment
*        - Status
*        - Reason
*        - Status1
*        - Reason1
*      properties:
*        Notes:
*          type: string
*          description: Notes
*        Order_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Order_Date
*        Quotation:
*          type: number
*          description: Quotation
*        Confirmation:
*          type: number
*          description: Confirmation
*        Invoice:
*          type: number
*          description: Invoice
*        Recieved:
*          type: number
*          description: Recieved
*        Calculated_Status:
*          type: number
*          description: Calculated_Status
*        Order_Number:
*          type: string
*          description: Order_Number
*        Equipment:
*          type: string
*          description: Equipment
*        Status:
*          type: string
*          description: Status
*        Reason:
*          type: string
*          description: Reason
*        Status1:
*          type: string
*          description: Status1
*        Reason1:
*          type: string
*          description: Reason1
*/

/**
*  @swagger
* tags:
*   name: Order_Status
*   description: Order_Status Table API
* /api/v1/Order_Status:
*   get:
*     summary: List All Order_Status Table
*     tags: [Order_Status]
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
*           example: "SELECT * FROM Order_Status WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_Status Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_Status'
*   post:
*     summary: Create New Order_Status
*     tags: [Order_Status]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Status'
*     responses:
*       200:
*         description: The Created Order_Status.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Status'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_Status/{ID}:
*   get:
*     summary: Get The Order_Status Row by id
*     tags: [Order_Status]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Status id
*     responses:
*       200:
*         description: The Order_Status response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Status'
*   put:
*     summary: Update The Order_Status by id
*     tags: [Order_Status]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_Status id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Status'
*     responses:
*       200:
*         description: The Order_Status Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Status'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_Status Row by id
*     tags: [Order_Status]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Status id
*     responses:
*       200:
*         description: The Order_Status response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Status'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_Status} = require('../controllers/Order_Status')
const {getOrder_Status} = require('../controllers/Order_Status')
const {addOrder_Status} = require('../controllers/Order_Status')
const {updateOrder_Status} = require('../controllers/Order_Status')
const {deleteOrder_Status} = require('../controllers/Order_Status')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_Status)

router.get('/:id', getOrder_Status)

router.post('/', addOrder_Status)

router.put('/:id', updateOrder_Status)

router.delete('/:id', deleteOrder_Status)

module.exports = router