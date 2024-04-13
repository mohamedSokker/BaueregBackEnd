/**
* @swagger
* components:
*   schemas:
*    Machinary:
*      type: object
*      required:
*        - Machinery_Type
*        - Machinery_Model
*        - Machinary_Specs
*        - Code
*        - Serial_No
*      properties:
*        Machinery_Type:
*          type: string
*          description: Machinery_Type
*        Machinery_Model:
*          type: string
*          description: Machinery_Model
*        Machinary_Specs:
*          type: string
*          description: Machinary_Specs
*        Code:
*          type: string
*          description: Code
*        Serial_No:
*          type: string
*          description: Serial_No
*/

/**
*  @swagger
* tags:
*   name: Machinary
*   description: Machinary Table API
* /api/v1/Machinary:
*   get:
*     summary: List All Machinary Table
*     tags: [Machinary]
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
*           example: "SELECT * FROM Machinary WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Machinary Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Machinary'
*   post:
*     summary: Create New Machinary
*     tags: [Machinary]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Machinary'
*     responses:
*       200:
*         description: The Created Machinary.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Machinary'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Machinary/{ID}:
*   get:
*     summary: Get The Machinary Row by id
*     tags: [Machinary]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Machinary id
*     responses:
*       200:
*         description: The Machinary response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Machinary'
*   put:
*     summary: Update The Machinary by id
*     tags: [Machinary]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Machinary id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Machinary'
*     responses:
*       200:
*         description: The Machinary Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Machinary'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Machinary Row by id
*     tags: [Machinary]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Machinary id
*     responses:
*       200:
*         description: The Machinary response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Machinary'
*/

const express = require('express');
const router = express.Router();
const {getAllMachinary} = require('../controllers/Machinary')
const {getMachinary} = require('../controllers/Machinary')
const {addMachinary} = require('../controllers/Machinary')
const {updateMachinary} = require('../controllers/Machinary')
const {deleteMachinary} = require('../controllers/Machinary')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllMachinary)

router.get('/:id', getMachinary)

router.post('/', addMachinary)

router.put('/:id', updateMachinary)

router.delete('/:id', deleteMachinary)

module.exports = router