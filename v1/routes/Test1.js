/**
* @swagger
* components:
*   schemas:
*    Test1:
*      type: object
*      required:
*        - DateTime
*        - Equipment
*        - Location
*      properties:
*        DateTime:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: DateTime
*        Equipment:
*          type: string
*          description: Equipment
*        Location:
*          type: string
*          description: Location
*/

/**
*  @swagger
* tags:
*   name: Test1
*   description: Test1 Table API
* /api/v1/Test1:
*   get:
*     summary: List All Test1 Table
*     tags: [Test1]
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
*           example: "SELECT * FROM Test1 WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Test1 Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Test1'
*   post:
*     summary: Create New Test1
*     tags: [Test1]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Test1'
*     responses:
*       200:
*         description: The Created Test1.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Test1'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Test1/{ID}:
*   get:
*     summary: Get The Test1 Row by id
*     tags: [Test1]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Test1 id
*     responses:
*       200:
*         description: The Test1 response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Test1'
*   put:
*     summary: Update The Test1 by id
*     tags: [Test1]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Test1 id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Test1'
*     responses:
*       200:
*         description: The Test1 Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Test1'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Test1 Row by id
*     tags: [Test1]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Test1 id
*     responses:
*       200:
*         description: The Test1 response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Test1'
*/

const express = require('express');
const router = express.Router();
const {getAllTest1} = require('../controllers/Test1')
const {getTest1} = require('../controllers/Test1')
const {addTest1} = require('../controllers/Test1')
const {updateTest1} = require('../controllers/Test1')
const {deleteTest1} = require('../controllers/Test1')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllTest1)

router.get('/:id', getTest1)

router.post('/', addTest1)

router.put('/:id', updateTest1)

router.delete('/:id', deleteTest1)

module.exports = router