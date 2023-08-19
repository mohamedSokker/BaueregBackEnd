/**
* @swagger
* components:
*   schemas:
*    GearBoxes:
*      type: object
*      required:
*        - Start_Date
*        - End_Date
*        - Equipment
*        - Location
*        - Rotary_Drive
*        - GearBox_Type
*        - Gearbox_Number
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
*        Location:
*          type: string
*          description: Location
*        Rotary_Drive:
*          type: string
*          description: Rotary_Drive
*        GearBox_Type:
*          type: string
*          description: GearBox_Type
*        Gearbox_Number:
*          type: string
*          description: Gearbox_Number
*        Status:
*          type: string
*          description: Status
*/

/**
*  @swagger
* tags:
*   name: GearBoxes
*   description: GearBoxes Table API
* /api/v1/GearBoxes:
*   get:
*     summary: List All GearBoxes Table
*     tags: [GearBoxes]
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
*           example: "SELECT * FROM GearBoxes WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The GearBoxes Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/GearBoxes'
*   post:
*     summary: Create New GearBoxes
*     tags: [GearBoxes]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/GearBoxes'
*     responses:
*       200:
*         description: The Created GearBoxes.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxes'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/GearBoxes/{ID}:
*   get:
*     summary: Get The GearBoxes Row by id
*     tags: [GearBoxes]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The GearBoxes id
*     responses:
*       200:
*         description: The GearBoxes response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxes'
*   put:
*     summary: Update The GearBoxes by id
*     tags: [GearBoxes]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The GearBoxes id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/GearBoxes'
*     responses:
*       200:
*         description: The GearBoxes Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxes'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove GearBoxes Row by id
*     tags: [GearBoxes]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The GearBoxes id
*     responses:
*       200:
*         description: The GearBoxes response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/GearBoxes'
*/

const express = require('express');
const router = express.Router();
const {getAllGearBoxes} = require('../controllers/GearBoxes')
const {getGearBoxes} = require('../controllers/GearBoxes')
const {addGearBoxes} = require('../controllers/GearBoxes')
const {updateGearBoxes} = require('../controllers/GearBoxes')
const {deleteGearBoxes} = require('../controllers/GearBoxes')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllGearBoxes)

router.get('/:id', getGearBoxes)

router.post('/', addGearBoxes)

router.put('/:id', updateGearBoxes)

router.delete('/:id', deleteGearBoxes)

module.exports = router