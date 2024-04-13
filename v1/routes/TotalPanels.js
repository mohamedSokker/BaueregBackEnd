/**
* @swagger
* components:
*   schemas:
*    TotalPanels:
*      type: object
*      required:
*        - TotalPanelsNo
*        - PanelWidth
*        - TheriticalDepth
*        - Location
*      properties:
*        TotalPanelsNo:
*          type: integer
*          description: TotalPanelsNo
*        PanelWidth:
*          type: number
*          description: PanelWidth
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
*   name: TotalPanels
*   description: TotalPanels Table API
* /api/v1/TotalPanels:
*   get:
*     summary: List All TotalPanels Table
*     tags: [TotalPanels]
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
*           example: "SELECT * FROM TotalPanels WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The TotalPanels Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/TotalPanels'
*   post:
*     summary: Create New TotalPanels
*     tags: [TotalPanels]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TotalPanels'
*     responses:
*       200:
*         description: The Created TotalPanels.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TotalPanels'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/TotalPanels/{ID}:
*   get:
*     summary: Get The TotalPanels Row by id
*     tags: [TotalPanels]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TotalPanels id
*     responses:
*       200:
*         description: The TotalPanels response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TotalPanels'
*   put:
*     summary: Update The TotalPanels by id
*     tags: [TotalPanels]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The TotalPanels id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TotalPanels'
*     responses:
*       200:
*         description: The TotalPanels Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TotalPanels'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove TotalPanels Row by id
*     tags: [TotalPanels]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TotalPanels id
*     responses:
*       200:
*         description: The TotalPanels response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TotalPanels'
*/

const express = require('express');
const router = express.Router();
const {getAllTotalPanels} = require('../controllers/TotalPanels')
const {getTotalPanels} = require('../controllers/TotalPanels')
const {addTotalPanels} = require('../controllers/TotalPanels')
const {updateTotalPanels} = require('../controllers/TotalPanels')
const {deleteTotalPanels} = require('../controllers/TotalPanels')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllTotalPanels)

router.get('/:id', getTotalPanels)

router.post('/', addTotalPanels)

router.put('/:id', updateTotalPanels)

router.delete('/:id', deleteTotalPanels)

module.exports = router