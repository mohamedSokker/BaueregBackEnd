/**
* @swagger
* components:
*   schemas:
*    Equipment_Performance_Piles:
*      type: object
*      required:
*        - Nom_Time
*        - Cutting_Time
*        - Depth
*        - Nom_Rate
*        - Actual_Rate
*        - Performance
*        - Location
*        - Equipment
*        - Pile_Name
*      properties:
*        Nom_Time:
*          type: integer
*          description: Nom_Time
*        Cutting_Time:
*          type: integer
*          description: Cutting_Time
*        Depth:
*          type: number
*          description: Depth
*        Nom_Rate:
*          type: number
*          description: Nom_Rate
*        Actual_Rate:
*          type: number
*          description: Actual_Rate
*        Performance:
*          type: number
*          description: Performance
*        Location:
*          type: string
*          description: Location
*        Equipment:
*          type: string
*          description: Equipment
*        Pile_Name:
*          type: string
*          description: Pile_Name
*/

/**
*  @swagger
* tags:
*   name: Equipment_Performance_Piles
*   description: Equipment_Performance_Piles Table API
* /api/v1/Equipment_Performance_Piles:
*   get:
*     summary: List All Equipment_Performance_Piles Table
*     tags: [Equipment_Performance_Piles]
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
*           example: "SELECT * FROM Equipment_Performance_Piles WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Equipment_Performance_Piles Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Equipment_Performance_Piles'
*   post:
*     summary: Create New Equipment_Performance_Piles
*     tags: [Equipment_Performance_Piles]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipment_Performance_Piles'
*     responses:
*       200:
*         description: The Created Equipment_Performance_Piles.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance_Piles'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Equipment_Performance_Piles/{ID}:
*   get:
*     summary: Get The Equipment_Performance_Piles Row by id
*     tags: [Equipment_Performance_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipment_Performance_Piles id
*     responses:
*       200:
*         description: The Equipment_Performance_Piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance_Piles'
*   put:
*     summary: Update The Equipment_Performance_Piles by id
*     tags: [Equipment_Performance_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Equipment_Performance_Piles id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipment_Performance_Piles'
*     responses:
*       200:
*         description: The Equipment_Performance_Piles Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance_Piles'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Equipment_Performance_Piles Row by id
*     tags: [Equipment_Performance_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipment_Performance_Piles id
*     responses:
*       200:
*         description: The Equipment_Performance_Piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance_Piles'
*/

const express = require('express');
const router = express.Router();
const {getAllEquipment_Performance_Piles} = require('../controllers/Equipment_Performance_Piles')
const {getEquipment_Performance_Piles} = require('../controllers/Equipment_Performance_Piles')
const {addEquipment_Performance_Piles} = require('../controllers/Equipment_Performance_Piles')
const {updateEquipment_Performance_Piles} = require('../controllers/Equipment_Performance_Piles')
const {deleteEquipment_Performance_Piles} = require('../controllers/Equipment_Performance_Piles')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllEquipment_Performance_Piles)

router.get('/:id', getEquipment_Performance_Piles)

router.post('/', addEquipment_Performance_Piles)

router.put('/:id', updateEquipment_Performance_Piles)

router.delete('/:id', deleteEquipment_Performance_Piles)

module.exports = router