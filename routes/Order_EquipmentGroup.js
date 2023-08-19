/**
* @swagger
* components:
*   schemas:
*    Order_EquipmentGroup:
*      type: object
*      required:
*        - Date
*        - OrderNo
*        - Equipment
*        - EquipmentGroup
*        - EquipmentType
*        - OrderValue
*      properties:
*        Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date
*        OrderNo:
*          type: string
*          description: OrderNo
*        Equipment:
*          type: string
*          description: Equipment
*        EquipmentGroup:
*          type: string
*          description: EquipmentGroup
*        EquipmentType:
*          type: string
*          description: EquipmentType
*        OrderValue:
*          type: string
*          description: OrderValue
*/

/**
*  @swagger
* tags:
*   name: Order_EquipmentGroup
*   description: Order_EquipmentGroup Table API
* /api/v1/Order_EquipmentGroup:
*   get:
*     summary: List All Order_EquipmentGroup Table
*     tags: [Order_EquipmentGroup]
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
*           example: "SELECT * FROM Order_EquipmentGroup WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_EquipmentGroup Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_EquipmentGroup'
*   post:
*     summary: Create New Order_EquipmentGroup
*     tags: [Order_EquipmentGroup]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_EquipmentGroup'
*     responses:
*       200:
*         description: The Created Order_EquipmentGroup.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_EquipmentGroup'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_EquipmentGroup/{ID}:
*   get:
*     summary: Get The Order_EquipmentGroup Row by id
*     tags: [Order_EquipmentGroup]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_EquipmentGroup id
*     responses:
*       200:
*         description: The Order_EquipmentGroup response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_EquipmentGroup'
*   put:
*     summary: Update The Order_EquipmentGroup by id
*     tags: [Order_EquipmentGroup]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_EquipmentGroup id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_EquipmentGroup'
*     responses:
*       200:
*         description: The Order_EquipmentGroup Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_EquipmentGroup'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_EquipmentGroup Row by id
*     tags: [Order_EquipmentGroup]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_EquipmentGroup id
*     responses:
*       200:
*         description: The Order_EquipmentGroup response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_EquipmentGroup'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_EquipmentGroup} = require('../controllers/Order_EquipmentGroup')
const {getOrder_EquipmentGroup} = require('../controllers/Order_EquipmentGroup')
const {addOrder_EquipmentGroup} = require('../controllers/Order_EquipmentGroup')
const {updateOrder_EquipmentGroup} = require('../controllers/Order_EquipmentGroup')
const {deleteOrder_EquipmentGroup} = require('../controllers/Order_EquipmentGroup')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_EquipmentGroup)

router.get('/:id', getOrder_EquipmentGroup)

router.post('/', addOrder_EquipmentGroup)

router.put('/:id', updateOrder_EquipmentGroup)

router.delete('/:id', deleteOrder_EquipmentGroup)

module.exports = router