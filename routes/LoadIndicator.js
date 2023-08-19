/**
* @swagger
* components:
*   schemas:
*    LoadIndicator:
*      type: object
*      required:
*        - Equipment_Type
*        - Equipment
*        - System_Type
*      properties:
*        Equipment_Type:
*          type: string
*          description: Equipment_Type
*        Equipment:
*          type: string
*          description: Equipment
*        System_Type:
*          type: string
*          description: System_Type
*/

/**
*  @swagger
* tags:
*   name: LoadIndicator
*   description: LoadIndicator Table API
* /api/v1/LoadIndicator:
*   get:
*     summary: List All LoadIndicator Table
*     tags: [LoadIndicator]
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
*           example: "SELECT * FROM LoadIndicator WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The LoadIndicator Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/LoadIndicator'
*   post:
*     summary: Create New LoadIndicator
*     tags: [LoadIndicator]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/LoadIndicator'
*     responses:
*       200:
*         description: The Created LoadIndicator.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/LoadIndicator'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/LoadIndicator/{ID}:
*   get:
*     summary: Get The LoadIndicator Row by id
*     tags: [LoadIndicator]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The LoadIndicator id
*     responses:
*       200:
*         description: The LoadIndicator response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/LoadIndicator'
*   put:
*     summary: Update The LoadIndicator by id
*     tags: [LoadIndicator]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The LoadIndicator id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/LoadIndicator'
*     responses:
*       200:
*         description: The LoadIndicator Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/LoadIndicator'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove LoadIndicator Row by id
*     tags: [LoadIndicator]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The LoadIndicator id
*     responses:
*       200:
*         description: The LoadIndicator response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/LoadIndicator'
*/

const express = require('express');
const router = express.Router();
const {getAllLoadIndicator} = require('../controllers/LoadIndicator')
const {getLoadIndicator} = require('../controllers/LoadIndicator')
const {addLoadIndicator} = require('../controllers/LoadIndicator')
const {updateLoadIndicator} = require('../controllers/LoadIndicator')
const {deleteLoadIndicator} = require('../controllers/LoadIndicator')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllLoadIndicator)

router.get('/:id', getLoadIndicator)

router.post('/', addLoadIndicator)

router.put('/:id', updateLoadIndicator)

router.delete('/:id', deleteLoadIndicator)

module.exports = router