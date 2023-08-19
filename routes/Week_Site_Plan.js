/**
* @swagger
* components:
*   schemas:
*    Week_Site_Plan:
*      type: object
*      required:
*        - DateFrom
*        - DateTo
*        - CutterMaintBetweenPanels
*        - InterruptionBetweenPanels
*        - Holidays
*        - TargetWashingTime
*        - TargetEcxhangeTime
*        - Nom_Time
*        - DefectedPanels
*        - PanelWidth
*        - Location
*        - Equipment
*      properties:
*        DateFrom:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: DateFrom
*        DateTo:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: DateTo
*        CutterMaintBetweenPanels:
*          type: integer
*          description: CutterMaintBetweenPanels
*        InterruptionBetweenPanels:
*          type: integer
*          description: InterruptionBetweenPanels
*        Holidays:
*          type: integer
*          description: Holidays
*        TargetWashingTime:
*          type: integer
*          description: TargetWashingTime
*        TargetEcxhangeTime:
*          type: integer
*          description: TargetEcxhangeTime
*        Nom_Time:
*          type: integer
*          description: Nom_Time
*        DefectedPanels:
*          type: number
*          description: DefectedPanels
*        PanelWidth:
*          type: number
*          description: PanelWidth
*        Location:
*          type: string
*          description: Location
*        Equipment:
*          type: string
*          description: Equipment
*/

/**
*  @swagger
* tags:
*   name: Week_Site_Plan
*   description: Week_Site_Plan Table API
* /api/v1/Week_Site_Plan:
*   get:
*     summary: List All Week_Site_Plan Table
*     tags: [Week_Site_Plan]
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
*           example: "SELECT * FROM Week_Site_Plan WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Week_Site_Plan Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Week_Site_Plan'
*   post:
*     summary: Create New Week_Site_Plan
*     tags: [Week_Site_Plan]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Week_Site_Plan'
*     responses:
*       200:
*         description: The Created Week_Site_Plan.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Week_Site_Plan'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Week_Site_Plan/{ID}:
*   get:
*     summary: Get The Week_Site_Plan Row by id
*     tags: [Week_Site_Plan]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Week_Site_Plan id
*     responses:
*       200:
*         description: The Week_Site_Plan response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Week_Site_Plan'
*   put:
*     summary: Update The Week_Site_Plan by id
*     tags: [Week_Site_Plan]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Week_Site_Plan id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Week_Site_Plan'
*     responses:
*       200:
*         description: The Week_Site_Plan Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Week_Site_Plan'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Week_Site_Plan Row by id
*     tags: [Week_Site_Plan]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Week_Site_Plan id
*     responses:
*       200:
*         description: The Week_Site_Plan response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Week_Site_Plan'
*/

const express = require('express');
const router = express.Router();
const {getAllWeek_Site_Plan} = require('../controllers/Week_Site_Plan')
const {getWeek_Site_Plan} = require('../controllers/Week_Site_Plan')
const {addWeek_Site_Plan} = require('../controllers/Week_Site_Plan')
const {updateWeek_Site_Plan} = require('../controllers/Week_Site_Plan')
const {deleteWeek_Site_Plan} = require('../controllers/Week_Site_Plan')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllWeek_Site_Plan)

router.get('/:id', getWeek_Site_Plan)

router.post('/', addWeek_Site_Plan)

router.put('/:id', updateWeek_Site_Plan)

router.delete('/:id', deleteWeek_Site_Plan)

module.exports = router