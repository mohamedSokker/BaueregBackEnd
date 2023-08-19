/**
* @swagger
* components:
*   schemas:
*    Soil_Components:
*      type: object
*      required:
*        - Meters
*        - Location
*        - Soil_Type
*      properties:
*        Meters:
*          type: integer
*          description: Meters
*        Location:
*          type: string
*          description: Location
*        Soil_Type:
*          type: string
*          description: Soil_Type
*/

/**
*  @swagger
* tags:
*   name: Soil_Components
*   description: Soil_Components Table API
* /api/v1/Soil_Components:
*   get:
*     summary: List All Soil_Components Table
*     tags: [Soil_Components]
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
*           example: "SELECT * FROM Soil_Components WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Soil_Components Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Soil_Components'
*   post:
*     summary: Create New Soil_Components
*     tags: [Soil_Components]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Soil_Components'
*     responses:
*       200:
*         description: The Created Soil_Components.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Components'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Soil_Components/{ID}:
*   get:
*     summary: Get The Soil_Components Row by id
*     tags: [Soil_Components]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Soil_Components id
*     responses:
*       200:
*         description: The Soil_Components response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Components'
*   put:
*     summary: Update The Soil_Components by id
*     tags: [Soil_Components]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Soil_Components id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Soil_Components'
*     responses:
*       200:
*         description: The Soil_Components Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Components'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Soil_Components Row by id
*     tags: [Soil_Components]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Soil_Components id
*     responses:
*       200:
*         description: The Soil_Components response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Soil_Components'
*/

const express = require('express');
const router = express.Router();
const {getAllSoil_Components} = require('../controllers/Soil_Components')
const {getSoil_Components} = require('../controllers/Soil_Components')
const {addSoil_Components} = require('../controllers/Soil_Components')
const {updateSoil_Components} = require('../controllers/Soil_Components')
const {deleteSoil_Components} = require('../controllers/Soil_Components')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllSoil_Components)

router.get('/:id', getSoil_Components)

router.post('/', addSoil_Components)

router.put('/:id', updateSoil_Components)

router.delete('/:id', deleteSoil_Components)

module.exports = router