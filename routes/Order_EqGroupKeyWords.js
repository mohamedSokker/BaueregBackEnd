/**
* @swagger
* components:
*   schemas:
*    Order_EqGroupKeyWords:
*      type: object
*      required:
*        - KeyWord
*        - EqGroup
*      properties:
*        KeyWord:
*          type: string
*          description: KeyWord
*        EqGroup:
*          type: string
*          description: EqGroup
*/

/**
*  @swagger
* tags:
*   name: Order_EqGroupKeyWords
*   description: Order_EqGroupKeyWords Table API
* /api/v1/Order_EqGroupKeyWords:
*   get:
*     summary: List All Order_EqGroupKeyWords Table
*     tags: [Order_EqGroupKeyWords]
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
*           example: "SELECT * FROM Order_EqGroupKeyWords WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Order_EqGroupKeyWords Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Order_EqGroupKeyWords'
*   post:
*     summary: Create New Order_EqGroupKeyWords
*     tags: [Order_EqGroupKeyWords]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_EqGroupKeyWords'
*     responses:
*       200:
*         description: The Created Order_EqGroupKeyWords.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqGroupKeyWords'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Order_EqGroupKeyWords/{ID}:
*   get:
*     summary: Get The Order_EqGroupKeyWords Row by id
*     tags: [Order_EqGroupKeyWords]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_EqGroupKeyWords id
*     responses:
*       200:
*         description: The Order_EqGroupKeyWords response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqGroupKeyWords'
*   put:
*     summary: Update The Order_EqGroupKeyWords by id
*     tags: [Order_EqGroupKeyWords]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Order_EqGroupKeyWords id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order_EqGroupKeyWords'
*     responses:
*       200:
*         description: The Order_EqGroupKeyWords Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqGroupKeyWords'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Order_EqGroupKeyWords Row by id
*     tags: [Order_EqGroupKeyWords]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Order_EqGroupKeyWords id
*     responses:
*       200:
*         description: The Order_EqGroupKeyWords response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Order_EqGroupKeyWords'
*/

const express = require('express');
const router = express.Router();
const {getAllOrder_EqGroupKeyWords} = require('../controllers/Order_EqGroupKeyWords')
const {getOrder_EqGroupKeyWords} = require('../controllers/Order_EqGroupKeyWords')
const {addOrder_EqGroupKeyWords} = require('../controllers/Order_EqGroupKeyWords')
const {updateOrder_EqGroupKeyWords} = require('../controllers/Order_EqGroupKeyWords')
const {deleteOrder_EqGroupKeyWords} = require('../controllers/Order_EqGroupKeyWords')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOrder_EqGroupKeyWords)

router.get('/:id', getOrder_EqGroupKeyWords)

router.post('/', addOrder_EqGroupKeyWords)

router.put('/:id', updateOrder_EqGroupKeyWords)

router.delete('/:id', deleteOrder_EqGroupKeyWords)

module.exports = router