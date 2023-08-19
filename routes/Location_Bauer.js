/**
* @swagger
* components:
*   schemas:
*    Location_Bauer:
*      type: object
*      required:
*        - Location
*        - Location_Ar 
*      properties:
*        Location:
*          type: string
*          description: Location
*        Location_Ar :
*          type: string
*          description: Location_Ar 
*/

/**
*  @swagger
* tags:
*   name: Location_Bauer
*   description: Location_Bauer Table API
* /api/v1/Location_Bauer:
*   get:
*     summary: List All Location_Bauer Table
*     tags: [Location_Bauer]
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
*           example: "SELECT * FROM Location_Bauer WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Location_Bauer Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Location_Bauer'
*   post:
*     summary: Create New Location_Bauer
*     tags: [Location_Bauer]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Location_Bauer'
*     responses:
*       200:
*         description: The Created Location_Bauer.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Location_Bauer'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Location_Bauer/{ID}:
*   get:
*     summary: Get The Location_Bauer Row by id
*     tags: [Location_Bauer]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Location_Bauer id
*     responses:
*       200:
*         description: The Location_Bauer response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Location_Bauer'
*   put:
*     summary: Update The Location_Bauer by id
*     tags: [Location_Bauer]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Location_Bauer id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Location_Bauer'
*     responses:
*       200:
*         description: The Location_Bauer Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Location_Bauer'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Location_Bauer Row by id
*     tags: [Location_Bauer]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Location_Bauer id
*     responses:
*       200:
*         description: The Location_Bauer response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Location_Bauer'
*/

const express = require('express');
const router = express.Router();
const {getAllLocation_Bauer} = require('../controllers/Location_Bauer')
const {getLocation_Bauer} = require('../controllers/Location_Bauer')
const {addLocation_Bauer} = require('../controllers/Location_Bauer')
const {updateLocation_Bauer} = require('../controllers/Location_Bauer')
const {deleteLocation_Bauer} = require('../controllers/Location_Bauer')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllLocation_Bauer)

router.get('/:id', getLocation_Bauer)

router.post('/', addLocation_Bauer)

router.put('/:id', updateLocation_Bauer)

router.delete('/:id', deleteLocation_Bauer)

module.exports = router