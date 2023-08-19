/**
* @swagger
* components:
*   schemas:
*    Equipment_Performance:
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
*        - Pannel_Name
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
*        Pannel_Name:
*          type: string
*          description: Pannel_Name
*/

/**
*  @swagger
* tags:
*   name: Equipment_Performance
*   description: Equipment_Performance Table API
* /api/v1/Equipment_Performance:
*   get:
*     summary: List All Equipment_Performance Table
*     tags: [Equipment_Performance]
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
*           example: "SELECT * FROM Equipment_Performance WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Equipment_Performance Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Equipment_Performance'
*   post:
*     summary: Create New Equipment_Performance
*     tags: [Equipment_Performance]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipment_Performance'
*     responses:
*       200:
*         description: The Created Equipment_Performance.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Equipment_Performance/{ID}:
*   get:
*     summary: Get The Equipment_Performance Row by id
*     tags: [Equipment_Performance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipment_Performance id
*     responses:
*       200:
*         description: The Equipment_Performance response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance'
*   put:
*     summary: Update The Equipment_Performance by id
*     tags: [Equipment_Performance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Equipment_Performance id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipment_Performance'
*     responses:
*       200:
*         description: The Equipment_Performance Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Equipment_Performance Row by id
*     tags: [Equipment_Performance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipment_Performance id
*     responses:
*       200:
*         description: The Equipment_Performance response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipment_Performance'
*/

const express = require('express');
const router = express.Router();
const {getAllEquipment_Performance} = require('../controllers/Equipment_Performance')
const {getEquipment_Performance} = require('../controllers/Equipment_Performance')
const {addEquipment_Performance} = require('../controllers/Equipment_Performance')
const {updateEquipment_Performance} = require('../controllers/Equipment_Performance')
const {deleteEquipment_Performance} = require('../controllers/Equipment_Performance')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllEquipment_Performance)

router.get('/:id', getEquipment_Performance)

router.post('/', addEquipment_Performance)

router.put('/:id', updateEquipment_Performance)

router.delete('/:id', deleteEquipment_Performance)

module.exports = router