/**
* @swagger
* components:
*   schemas:
*    Operating_Hrs:
*      type: object
*      required:
*        - Start_Date
*        - End_Date
*        - Location
*        - Equipment
*        - Start_OperatingHrs
*        - End_OperatingHrs
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
*        Location:
*          type: string
*          description: Location
*        Equipment:
*          type: string
*          description: Equipment
*        Start_OperatingHrs:
*          type: string
*          description: Start_OperatingHrs
*        End_OperatingHrs:
*          type: string
*          description: End_OperatingHrs
*/

/**
*  @swagger
* tags:
*   name: Operating_Hrs
*   description: Operating_Hrs Table API
* /api/v1/Operating_Hrs:
*   get:
*     summary: List All Operating_Hrs Table
*     tags: [Operating_Hrs]
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
*           example: "SELECT * FROM Operating_Hrs WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Operating_Hrs Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Operating_Hrs'
*   post:
*     summary: Create New Operating_Hrs
*     tags: [Operating_Hrs]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Operating_Hrs'
*     responses:
*       200:
*         description: The Created Operating_Hrs.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Operating_Hrs'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Operating_Hrs/{ID}:
*   get:
*     summary: Get The Operating_Hrs Row by id
*     tags: [Operating_Hrs]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Operating_Hrs id
*     responses:
*       200:
*         description: The Operating_Hrs response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Operating_Hrs'
*   put:
*     summary: Update The Operating_Hrs by id
*     tags: [Operating_Hrs]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Operating_Hrs id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Operating_Hrs'
*     responses:
*       200:
*         description: The Operating_Hrs Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Operating_Hrs'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Operating_Hrs Row by id
*     tags: [Operating_Hrs]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Operating_Hrs id
*     responses:
*       200:
*         description: The Operating_Hrs response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Operating_Hrs'
*/

const express = require('express');
const router = express.Router();
const {getAllOperating_Hrs} = require('../controllers/Operating_Hrs')
const {getOperating_Hrs} = require('../controllers/Operating_Hrs')
const {addOperating_Hrs} = require('../controllers/Operating_Hrs')
const {updateOperating_Hrs} = require('../controllers/Operating_Hrs')
const {deleteOperating_Hrs} = require('../controllers/Operating_Hrs')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllOperating_Hrs)

router.get('/:id', getOperating_Hrs)

router.post('/', addOperating_Hrs)

router.put('/:id', updateOperating_Hrs)

router.delete('/:id', deleteOperating_Hrs)

module.exports = router