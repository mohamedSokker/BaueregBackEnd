/**
* @swagger
* components:
*   schemas:
*    Soil_Rates:
*      type: object
*      required:
*        - Pannel_Width
*        - Nom_Rate
*        - Soil_Type
*        - Pannel_Type
*      properties:
*        Pannel_Width:
*          type: number
*          description: Pannel_Width
*        Nom_Rate:
*          type: number
*          description: Nom_Rate
*        Soil_Type:
*          type: string
*          description: Soil_Type
*        Pannel_Type:
*          type: string
*          description: Pannel_Type
*/

/**
*  @swagger
* tags:
*   name: Soil_Rates
*   description: Soil_Rates Table API
* /api/v1/Soil_Rates:
*   get:
*     summary: List All Soil_Rates Table
*     tags: [Soil_Rates]
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
*           example: "SELECT * FROM Soil_Rates WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Soil_Rates Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Soil_Rates'
*   post:
*     summary: Create New Soil_Rates
*     tags: [Soil_Rates]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Soil_Rates'
*     responses:
*       200:
*         description: The Created Soil_Rates.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Soil_Rates/{ID}:
*   get:
*     summary: Get The Soil_Rates Row by id
*     tags: [Soil_Rates]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Soil_Rates id
*     responses:
*       200:
*         description: The Soil_Rates response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates'
*   put:
*     summary: Update The Soil_Rates by id
*     tags: [Soil_Rates]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Soil_Rates id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Soil_Rates'
*     responses:
*       200:
*         description: The Soil_Rates Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Soil_Rates Row by id
*     tags: [Soil_Rates]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Soil_Rates id
*     responses:
*       200:
*         description: The Soil_Rates response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Rates'
*/

const express = require('express');
const router = express.Router();
const {getAllSoil_Rates} = require('../controllers/Soil_Rates')
const {getSoil_Rates} = require('../controllers/Soil_Rates')
const {addSoil_Rates} = require('../controllers/Soil_Rates')
const {updateSoil_Rates} = require('../controllers/Soil_Rates')
const {deleteSoil_Rates} = require('../controllers/Soil_Rates')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllSoil_Rates)

router.get('/:id', getSoil_Rates)

router.post('/', addSoil_Rates)

router.put('/:id', updateSoil_Rates)

router.delete('/:id', deleteSoil_Rates)

module.exports = router