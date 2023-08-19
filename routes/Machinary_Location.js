/**
* @swagger
* components:
*   schemas:
*    Machinary_Location:
*      type: object
*      required:
*        - Start_Date
*        - End_Date
*        - Machinery_Type
*        - Machinery_Model
*        - Machinary_Specs
*        - Code
*        - Serial_No
*        - Location
*        - Machinery_Status
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
*        Machinery_Type:
*          type: string
*          description: Machinery_Type
*        Machinery_Model:
*          type: string
*          description: Machinery_Model
*        Machinary_Specs:
*          type: string
*          description: Machinary_Specs
*        Code:
*          type: string
*          description: Code
*        Serial_No:
*          type: string
*          description: Serial_No
*        Location:
*          type: string
*          description: Location
*        Machinery_Status:
*          type: string
*          description: Machinery_Status
*/

/**
*  @swagger
* tags:
*   name: Machinary_Location
*   description: Machinary_Location Table API
* /api/v1/Machinary_Location:
*   get:
*     summary: List All Machinary_Location Table
*     tags: [Machinary_Location]
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
*           example: "SELECT * FROM Machinary_Location WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Machinary_Location Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Machinary_Location'
*   post:
*     summary: Create New Machinary_Location
*     tags: [Machinary_Location]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Machinary_Location'
*     responses:
*       200:
*         description: The Created Machinary_Location.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Machinary_Location'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Machinary_Location/{ID}:
*   get:
*     summary: Get The Machinary_Location Row by id
*     tags: [Machinary_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Machinary_Location id
*     responses:
*       200:
*         description: The Machinary_Location response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Machinary_Location'
*   put:
*     summary: Update The Machinary_Location by id
*     tags: [Machinary_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Machinary_Location id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Machinary_Location'
*     responses:
*       200:
*         description: The Machinary_Location Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Machinary_Location'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Machinary_Location Row by id
*     tags: [Machinary_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Machinary_Location id
*     responses:
*       200:
*         description: The Machinary_Location response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Machinary_Location'
*/

const express = require('express');
const router = express.Router();
const {getAllMachinary_Location} = require('../controllers/Machinary_Location')
const {getMachinary_Location} = require('../controllers/Machinary_Location')
const {addMachinary_Location} = require('../controllers/Machinary_Location')
const {updateMachinary_Location} = require('../controllers/Machinary_Location')
const {deleteMachinary_Location} = require('../controllers/Machinary_Location')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllMachinary_Location)

router.get('/:id', getMachinary_Location)

router.post('/', addMachinary_Location)

router.put('/:id', updateMachinary_Location)

router.delete('/:id', deleteMachinary_Location)

module.exports = router