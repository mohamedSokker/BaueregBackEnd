/**
* @swagger
* components:
*   schemas:
*    Reference_Stock:
*      type: object
*      required:
*        - Item
*        - Description
*        - Remarks
*        - Code
*        - Part_No
*        - Unit
*      properties:
*        Item:
*          type: string
*          description: Item
*        Description:
*          type: string
*          description: Description
*        Remarks:
*          type: string
*          description: Remarks
*        Code:
*          type: string
*          description: Code
*        Part_No:
*          type: string
*          description: Part_No
*        Unit:
*          type: string
*          description: Unit
*/

/**
*  @swagger
* tags:
*   name: Reference_Stock
*   description: Reference_Stock Table API
* /api/v1/Reference_Stock:
*   get:
*     summary: List All Reference_Stock Table
*     tags: [Reference_Stock]
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
*           example: "SELECT * FROM Reference_Stock WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Reference_Stock Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Reference_Stock'
*   post:
*     summary: Create New Reference_Stock
*     tags: [Reference_Stock]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Reference_Stock'
*     responses:
*       200:
*         description: The Created Reference_Stock.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Reference_Stock'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Reference_Stock/{ID}:
*   get:
*     summary: Get The Reference_Stock Row by id
*     tags: [Reference_Stock]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Reference_Stock id
*     responses:
*       200:
*         description: The Reference_Stock response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Reference_Stock'
*   put:
*     summary: Update The Reference_Stock by id
*     tags: [Reference_Stock]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Reference_Stock id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Reference_Stock'
*     responses:
*       200:
*         description: The Reference_Stock Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Reference_Stock'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Reference_Stock Row by id
*     tags: [Reference_Stock]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Reference_Stock id
*     responses:
*       200:
*         description: The Reference_Stock response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Reference_Stock'
*/

const express = require('express');
const router = express.Router();
const {getAllReference_Stock} = require('../controllers/Reference_Stock')
const {getReference_Stock} = require('../controllers/Reference_Stock')
const {addReference_Stock} = require('../controllers/Reference_Stock')
const {updateReference_Stock} = require('../controllers/Reference_Stock')
const {deleteReference_Stock} = require('../controllers/Reference_Stock')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllReference_Stock)

router.get('/:id', getReference_Stock)

router.post('/', addReference_Stock)

router.put('/:id', updateReference_Stock)

router.delete('/:id', deleteReference_Stock)

module.exports = router