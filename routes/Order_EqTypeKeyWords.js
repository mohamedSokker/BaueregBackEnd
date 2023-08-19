/**
* @swagger
* components:
*   schemas:
*    Order_EqTypeKeyWords:
*      type: object
*      required:
*        - KeyWord
*        - EqType
*      properties:
*        KeyWord:
*          type: string
*          description: KeyWord
*        EqType:
*          type: string
*          description: EqType
*/

/**
*  @swagger
* tags:
*   name: Order_EqTypeKeyWords
*   description: Order_EqTypeKeyWords Table API
* /api/v1/Order_EqTypeKeyWords:
*   get:
*     summary: List All Order_EqTypeKeyWords Table
*     tags: [Order_EqTypeKeyWords]
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
*           example: "SELECT * FROM Order_EqTypeKeyWords WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_EqTypeKeyWords Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_EqTypeKeyWords'
*   post:
*     summary: Create New Order_EqTypeKeyWords
*     tags: [Order_EqTypeKeyWords]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_EqTypeKeyWords'
*     responses:
*       200:
*         description: The Created Order_EqTypeKeyWords.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqTypeKeyWords'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_EqTypeKeyWords/{ID}:
*   get:
*     summary: Get The Order_EqTypeKeyWords Row by id
*     tags: [Order_EqTypeKeyWords]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_EqTypeKeyWords id
*     responses:
*       200:
*         description: The Order_EqTypeKeyWords response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqTypeKeyWords'
*   put:
*     summary: Update The Order_EqTypeKeyWords by id
*     tags: [Order_EqTypeKeyWords]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_EqTypeKeyWords id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_EqTypeKeyWords'
*     responses:
*       200:
*         description: The Order_EqTypeKeyWords Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqTypeKeyWords'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_EqTypeKeyWords Row by id
*     tags: [Order_EqTypeKeyWords]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_EqTypeKeyWords id
*     responses:
*       200:
*         description: The Order_EqTypeKeyWords response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqTypeKeyWords'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_EqTypeKeyWords} = require('../controllers/Order_EqTypeKeyWords')
const {getOrder_EqTypeKeyWords} = require('../controllers/Order_EqTypeKeyWords')
const {addOrder_EqTypeKeyWords} = require('../controllers/Order_EqTypeKeyWords')
const {updateOrder_EqTypeKeyWords} = require('../controllers/Order_EqTypeKeyWords')
const {deleteOrder_EqTypeKeyWords} = require('../controllers/Order_EqTypeKeyWords')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_EqTypeKeyWords)

router.get('/:id', getOrder_EqTypeKeyWords)

router.post('/', addOrder_EqTypeKeyWords)

router.put('/:id', updateOrder_EqTypeKeyWords)

router.delete('/:id', deleteOrder_EqTypeKeyWords)

module.exports = router