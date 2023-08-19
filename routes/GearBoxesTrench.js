/**
* @swagger
* components:
*   schemas:
*    GearBoxesTrench:
*      type: object
*      required:
*        - Start_Date
*        - End_Date
*        - Equipment
*        - Equipment_Location
*        - Gearbox
*        - Gearbox Number
*        - Gearbox Type
*        - Status
*      properties:
*        Start_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Start_Date
*        End_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: End_Date
*        Equipment:
*          type: string
*          description: Equipment
*        Equipment_Location:
*          type: string
*          description: Equipment_Location
*        Gearbox:
*          type: string
*          description: Gearbox
*        Gearbox Number:
*          type: string
*          description: Gearbox Number
*        Gearbox Type:
*          type: string
*          description: Gearbox Type
*        Status:
*          type: string
*          description: Status
*/

/**
*  @swagger
* tags:
*   name: GearBoxesTrench
*   description: GearBoxesTrench Table API
* /api/v1/GearBoxesTrench:
*   get:
*     summary: List All GearBoxesTrench Table
*     tags: [GearBoxesTrench]
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
*           example: "SELECT * FROM GearBoxesTrench WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The GearBoxesTrench Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/GearBoxesTrench'
*   post:
*     summary: Create New GearBoxesTrench
*     tags: [GearBoxesTrench]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/GearBoxesTrench'
*     responses:
*       200:
*         description: The Created GearBoxesTrench.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxesTrench'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/GearBoxesTrench/{ID}:
*   get:
*     summary: Get The GearBoxesTrench Row by id
*     tags: [GearBoxesTrench]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The GearBoxesTrench id
*     responses:
*       200:
*         description: The GearBoxesTrench response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxesTrench'
*   put:
*     summary: Update The GearBoxesTrench by id
*     tags: [GearBoxesTrench]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The GearBoxesTrench id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/GearBoxesTrench'
*     responses:
*       200:
*         description: The GearBoxesTrench Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxesTrench'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove GearBoxesTrench Row by id
*     tags: [GearBoxesTrench]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The GearBoxesTrench id
*     responses:
*       200:
*         description: The GearBoxesTrench response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxesTrench'
*/

const express = require('express');
const router = express.Router();
const {getAllGearBoxesTrench} = require('../controllers/GearBoxesTrench')
const {getGearBoxesTrench} = require('../controllers/GearBoxesTrench')
const {addGearBoxesTrench} = require('../controllers/GearBoxesTrench')
const {updateGearBoxesTrench} = require('../controllers/GearBoxesTrench')
const {deleteGearBoxesTrench} = require('../controllers/GearBoxesTrench')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllGearBoxesTrench)

router.get('/:id', getGearBoxesTrench)

router.post('/', addGearBoxesTrench)

router.put('/:id', updateGearBoxesTrench)

router.delete('/:id', deleteGearBoxesTrench)

module.exports = router