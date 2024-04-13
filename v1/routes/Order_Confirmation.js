/**
* @swagger
* components:
*   schemas:
*    Order_Confirmation:
*      type: object
*      required:
*        - Date
*        - DeliveryDate
*        - ConfirmationNo
*        - PartNo
*        - Quantity
*        - UnitPrice
*        - TotalPrice
*        - OrderNo
*        - Description
*        - Unit
*        - ShipmentMode
*      properties:
*        Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date
*        DeliveryDate:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: DeliveryDate
*        ConfirmationNo:
*          type: number
*          description: ConfirmationNo
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
*        ShipmentMode:
*          type: string
*          description: ShipmentMode
*/

/**
*  @swagger
* tags:
*   name: Order_Confirmation
*   description: Order_Confirmation Table API
* /api/v1/Order_Confirmation:
*   get:
*     summary: List All Order_Confirmation Table
*     tags: [Order_Confirmation]
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
*           example: "SELECT * FROM Order_Confirmation WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_Confirmation Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_Confirmation'
*   post:
*     summary: Create New Order_Confirmation
*     tags: [Order_Confirmation]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Confirmation'
*     responses:
*       200:
*         description: The Created Order_Confirmation.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Confirmation'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_Confirmation/{ID}:
*   get:
*     summary: Get The Order_Confirmation Row by id
*     tags: [Order_Confirmation]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Confirmation id
*     responses:
*       200:
*         description: The Order_Confirmation response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Confirmation'
*   put:
*     summary: Update The Order_Confirmation by id
*     tags: [Order_Confirmation]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_Confirmation id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_Confirmation'
*     responses:
*       200:
*         description: The Order_Confirmation Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_Confirmation'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_Confirmation Row by id
*     tags: [Order_Confirmation]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_Confirmation id
*     responses:
*       200:
*         description: The Order_Confirmation response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_Confirmation'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_Confirmation} = require('../controllers/Order_Confirmation')
const {getOrder_Confirmation} = require('../controllers/Order_Confirmation')
const {addOrder_Confirmation} = require('../controllers/Order_Confirmation')
const {updateOrder_Confirmation} = require('../controllers/Order_Confirmation')
const {deleteOrder_Confirmation} = require('../controllers/Order_Confirmation')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_Confirmation)

router.get('/:id', getOrder_Confirmation)

router.post('/', addOrder_Confirmation)

router.put('/:id', updateOrder_Confirmation)

router.delete('/:id', deleteOrder_Confirmation)

module.exports = router