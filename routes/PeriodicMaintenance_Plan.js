/**
* @swagger
* components:
*   schemas:
*    PeriodicMaintenance_Plan:
*      type: object
*      required:
*        - ExpectedTask
*        - PerMaint_Details
*        - Tasks_Unperformed
*        - PeriodicMaintenance_Interval
*        - TimeStart
*        - TimeEnd
*        - ExpectedOrActualNextDate
*        - Duration
*        - Year
*        - Location
*        - Equipment_Type
*        - Equipment_Model
*        - Equipment
*        - Working_Hours
*        - Type
*      properties:
*        ExpectedTask:
*          type: string
*          description: ExpectedTask
*        PerMaint_Details:
*          type: string
*          description: PerMaint_Details
*        Tasks_Unperformed:
*          type: string
*          description: Tasks_Unperformed
*        PeriodicMaintenance_Interval:
*          type: integer
*          description: PeriodicMaintenance_Interval
*        TimeStart:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: TimeStart
*        TimeEnd:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: TimeEnd
*        ExpectedOrActualNextDate:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: ExpectedOrActualNextDate
*        Duration:
*          type: number
*          description: Duration
*        Year:
*          type: string
*          description: Year
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
*        Type:
*          type: string
*          description: Type
*/

/**
*  @swagger
* tags:
*   name: PeriodicMaintenance_Plan
*   description: PeriodicMaintenance_Plan Table API
* /api/v1/PeriodicMaintenance_Plan:
*   get:
*     summary: List All PeriodicMaintenance_Plan Table
*     tags: [PeriodicMaintenance_Plan]
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
*           example: "SELECT * FROM PeriodicMaintenance_Plan WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The PeriodicMaintenance_Plan Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/PeriodicMaintenance_Plan'
*   post:
*     summary: Create New PeriodicMaintenance_Plan
*     tags: [PeriodicMaintenance_Plan]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/PeriodicMaintenance_Plan'
*     responses:
*       200:
*         description: The Created PeriodicMaintenance_Plan.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PeriodicMaintenance_Plan'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/PeriodicMaintenance_Plan/{ID}:
*   get:
*     summary: Get The PeriodicMaintenance_Plan Row by id
*     tags: [PeriodicMaintenance_Plan]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The PeriodicMaintenance_Plan id
*     responses:
*       200:
*         description: The PeriodicMaintenance_Plan response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/PeriodicMaintenance_Plan'
*   put:
*     summary: Update The PeriodicMaintenance_Plan by id
*     tags: [PeriodicMaintenance_Plan]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The PeriodicMaintenance_Plan id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/PeriodicMaintenance_Plan'
*     responses:
*       200:
*         description: The PeriodicMaintenance_Plan Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PeriodicMaintenance_Plan'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove PeriodicMaintenance_Plan Row by id
*     tags: [PeriodicMaintenance_Plan]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The PeriodicMaintenance_Plan id
*     responses:
*       200:
*         description: The PeriodicMaintenance_Plan response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/PeriodicMaintenance_Plan'
*/

const express = require('express');
const router = express.Router();
const {getAllPeriodicMaintenance_Plan} = require('../controllers/PeriodicMaintenance_Plan')
const {getPeriodicMaintenance_Plan} = require('../controllers/PeriodicMaintenance_Plan')
const {addPeriodicMaintenance_Plan} = require('../controllers/PeriodicMaintenance_Plan')
const {updatePeriodicMaintenance_Plan} = require('../controllers/PeriodicMaintenance_Plan')
const {deletePeriodicMaintenance_Plan} = require('../controllers/PeriodicMaintenance_Plan')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllPeriodicMaintenance_Plan)

router.get('/:id', getPeriodicMaintenance_Plan)

router.post('/', addPeriodicMaintenance_Plan)

router.put('/:id', updatePeriodicMaintenance_Plan)

router.delete('/:id', deletePeriodicMaintenance_Plan)

module.exports = router