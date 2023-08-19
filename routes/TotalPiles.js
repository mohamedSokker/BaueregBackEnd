/**
* @swagger
* components:
*   schemas:
*    TotalPiles:
*      type: object
*      required:
*        - TotalPilesNo
*        - PileDiameter
*        - TheriticalDepth
*        - Location
*      properties:
*        TotalPilesNo:
*          type: integer
*          description: TotalPilesNo
*        PileDiameter:
*          type: number
*          description: PileDiameter
*        TheriticalDepth:
*          type: number
*          description: TheriticalDepth
*        Location:
*          type: string
*          description: Location
*/

/**
*  @swagger
* tags:
*   name: TotalPiles
*   description: TotalPiles Table API
* /api/v1/TotalPiles:
*   get:
*     summary: List All TotalPiles Table
*     tags: [TotalPiles]
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
*           example: "SELECT * FROM TotalPiles WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The TotalPiles Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/TotalPiles'
*   post:
*     summary: Create New TotalPiles
*     tags: [TotalPiles]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TotalPiles'
*     responses:
*       200:
*         description: The Created TotalPiles.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TotalPiles'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/TotalPiles/{ID}:
*   get:
*     summary: Get The TotalPiles Row by id
*     tags: [TotalPiles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TotalPiles id
*     responses:
*       200:
*         description: The TotalPiles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TotalPiles'
*   put:
*     summary: Update The TotalPiles by id
*     tags: [TotalPiles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The TotalPiles id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TotalPiles'
*     responses:
*       200:
*         description: The TotalPiles Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TotalPiles'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove TotalPiles Row by id
*     tags: [TotalPiles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TotalPiles id
*     responses:
*       200:
*         description: The TotalPiles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TotalPiles'
*/

const express = require('express');
const router = express.Router();
const {getAllTotalPiles} = require('../controllers/TotalPiles')
const {getTotalPiles} = require('../controllers/TotalPiles')
const {addTotalPiles} = require('../controllers/TotalPiles')
const {updateTotalPiles} = require('../controllers/TotalPiles')
const {deleteTotalPiles} = require('../controllers/TotalPiles')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllTotalPiles)

router.get('/:id', getTotalPiles)

router.post('/', addTotalPiles)

router.put('/:id', updateTotalPiles)

router.delete('/:id', deleteTotalPiles)

module.exports = router