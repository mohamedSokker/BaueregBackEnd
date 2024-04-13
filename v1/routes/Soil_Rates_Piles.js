/**
* @swagger
* components:
*   schemas:
*    Soil_Rates_Piles:
*      type: object
*      required:
*        - Pile_Diameter
*        - Nom_Rate
*        - Soil_Type
*      properties:
*        Pile_Diameter:
*          type: number
*          description: Pile_Diameter
*        Nom_Rate:
*          type: number
*          description: Nom_Rate
*        Soil_Type:
*          type: string
*          description: Soil_Type
*/

/**
*  @swagger
* tags:
*   name: Soil_Rates_Piles
*   description: Soil_Rates_Piles Table API
* /api/v1/Soil_Rates_Piles:
*   get:
*     summary: List All Soil_Rates_Piles Table
*     tags: [Soil_Rates_Piles]
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
*           example: "SELECT * FROM Soil_Rates_Piles WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Soil_Rates_Piles Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Soil_Rates_Piles'
*   post:
*     summary: Create New Soil_Rates_Piles
*     tags: [Soil_Rates_Piles]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Soil_Rates_Piles'
*     responses:
*       200:
*         description: The Created Soil_Rates_Piles.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates_Piles'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Soil_Rates_Piles/{ID}:
*   get:
*     summary: Get The Soil_Rates_Piles Row by id
*     tags: [Soil_Rates_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Soil_Rates_Piles id
*     responses:
*       200:
*         description: The Soil_Rates_Piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates_Piles'
*   put:
*     summary: Update The Soil_Rates_Piles by id
*     tags: [Soil_Rates_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Soil_Rates_Piles id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Soil_Rates_Piles'
*     responses:
*       200:
*         description: The Soil_Rates_Piles Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates_Piles'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Soil_Rates_Piles Row by id
*     tags: [Soil_Rates_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Soil_Rates_Piles id
*     responses:
*       200:
*         description: The Soil_Rates_Piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates_Piles'
*/

const express = require('express');
const router = express.Router();
const {getAllSoil_Rates_Piles} = require('../controllers/Soil_Rates_Piles')
const {getSoil_Rates_Piles} = require('../controllers/Soil_Rates_Piles')
const {addSoil_Rates_Piles} = require('../controllers/Soil_Rates_Piles')
const {updateSoil_Rates_Piles} = require('../controllers/Soil_Rates_Piles')
const {deleteSoil_Rates_Piles} = require('../controllers/Soil_Rates_Piles')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllSoil_Rates_Piles)

router.get('/:id', getSoil_Rates_Piles)

router.post('/', addSoil_Rates_Piles)

router.put('/:id', updateSoil_Rates_Piles)

router.delete('/:id', deleteSoil_Rates_Piles)

module.exports = router