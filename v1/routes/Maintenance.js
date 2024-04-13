/**
* @swagger
* components:
*   schemas:
*    Maintenance:
*      type: object
*      required:
*        - Problem
*        - Action
*        - Spare_part
*        - Date_Time
*        - Problem_start_From
*        - Problem_End_To
*        - Location
*        - Equipment_Type
*        - Equipment_Model
*        - Equipment
*        - Working_Hours
*        - Breakdown_Type
*        - Breakdown_time
*        - Site_QC_Min
*      properties:
*        Problem:
*          type: string
*          description: Problem
*        Action:
*          type: string
*          description: Action
*        Spare_part:
*          type: string
*          description: Spare_part
*        Date_Time:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date_Time
*        Problem_start_From:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Problem_start_From
*        Problem_End_To:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Problem_End_To
*        Location:
*          type: string
*          description: Location
*        Equipment_Type:
*          type: string
*          description: Equipment_Type
*        Equipment_Model:
*          type: string
*          description: Equipment_Model
*        Equipment:
*          type: string
*          description: Equipment
*        Working_Hours:
*          type: string
*          description: Working_Hours
*        Breakdown_Type:
*          type: string
*          description: Breakdown_Type
*        Breakdown_time:
*          type: string
*          description: Breakdown_time
*        Site_QC_Min:
*          type: string
*          description: Site_QC_Min
*/

/**
*  @swagger
* tags:
*   name: Maintenance
*   description: Maintenance Table API
* /api/v1/Maintenance:
*   get:
*     summary: List All Maintenance Table
*     tags: [Maintenance]
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
*           example: "SELECT * FROM Maintenance WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Maintenance Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Maintenance'
*   post:
*     summary: Create New Maintenance
*     tags: [Maintenance]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Maintenance'
*     responses:
*       200:
*         description: The Created Maintenance.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Maintenance/{ID}:
*   get:
*     summary: Get The Maintenance Row by id
*     tags: [Maintenance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Maintenance id
*     responses:
*       200:
*         description: The Maintenance response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance'
*   put:
*     summary: Update The Maintenance by id
*     tags: [Maintenance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Maintenance id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Maintenance'
*     responses:
*       200:
*         description: The Maintenance Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Maintenance Row by id
*     tags: [Maintenance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Maintenance id
*     responses:
*       200:
*         description: The Maintenance response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Maintenance'
*/

const express = require('express');
const router = express.Router();
const {getAllMaintenance} = require('../controllers/Maintenance')
const {getMaintenance} = require('../controllers/Maintenance')
const {addMaintenance} = require('../controllers/Maintenance')
const {updateMaintenance} = require('../controllers/Maintenance')
const {deleteMaintenance} = require('../controllers/Maintenance')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllMaintenance)

router.get('/:id', getMaintenance)

router.post('/', addMaintenance)

router.put('/:id', updateMaintenance)

router.delete('/:id', deleteMaintenance)

module.exports = router