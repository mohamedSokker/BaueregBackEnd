/**
* @swagger
* components:
*   schemas:
*    Recieved_Invoices:
*      type: object
*      required:
*        - OrderNos
*        - Equipments
*        - Received_Date
*        - Invoices
*      properties:
*        OrderNos:
*          type: string
*          description: OrderNos
*        Equipments:
*          type: string
*          description: Equipments
*        Received_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Received_Date
*        Invoices:
*          type: number
*          description: Invoices
*/

/**
*  @swagger
* tags:
*   name: Recieved_Invoices
*   description: Recieved_Invoices Table API
* /api/v1/Recieved_Invoices:
*   get:
*     summary: List All Recieved_Invoices Table
*     tags: [Recieved_Invoices]
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
*           example: "SELECT * FROM Recieved_Invoices WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Recieved_Invoices Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Recieved_Invoices'
*   post:
*     summary: Create New Recieved_Invoices
*     tags: [Recieved_Invoices]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Recieved_Invoices'
*     responses:
*       200:
*         description: The Created Recieved_Invoices.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Recieved_Invoices'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Recieved_Invoices/{ID}:
*   get:
*     summary: Get The Recieved_Invoices Row by id
*     tags: [Recieved_Invoices]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Recieved_Invoices id
*     responses:
*       200:
*         description: The Recieved_Invoices response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Recieved_Invoices'
*   put:
*     summary: Update The Recieved_Invoices by id
*     tags: [Recieved_Invoices]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Recieved_Invoices id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Recieved_Invoices'
*     responses:
*       200:
*         description: The Recieved_Invoices Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Recieved_Invoices'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Recieved_Invoices Row by id
*     tags: [Recieved_Invoices]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Recieved_Invoices id
*     responses:
*       200:
*         description: The Recieved_Invoices response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Recieved_Invoices'
*/

const express = require('express');
const router = express.Router();
const {getAllRecieved_Invoices} = require('../controllers/Recieved_Invoices')
const {getRecieved_Invoices} = require('../controllers/Recieved_Invoices')
const {addRecieved_Invoices} = require('../controllers/Recieved_Invoices')
const {updateRecieved_Invoices} = require('../controllers/Recieved_Invoices')
const {deleteRecieved_Invoices} = require('../controllers/Recieved_Invoices')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllRecieved_Invoices)

router.get('/:id', getRecieved_Invoices)

router.post('/', addRecieved_Invoices)

router.put('/:id', updateRecieved_Invoices)

router.delete('/:id', deleteRecieved_Invoices)

module.exports = router