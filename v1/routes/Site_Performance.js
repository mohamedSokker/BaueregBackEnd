/**
* @swagger
* components:
*   schemas:
*    Site_Performance:
*      type: object
*      required:
*        - Date_From
*        - Date_To
*        - AccumilativePanelsNo
*        - Planned_Panels
*        - Planned_Time
*        - Breakdown
*        - Periodic_Maintenance
*        - Cutter_Maintenance
*        - Interruption
*        - Available_Time
*        - Site_Quality
*        - OEE
*        - Progress
*        - Availability
*        - Target_Volume
*        - Actual_Volume
*        - Site_Performance
*        - AccumilativeVolume
*        - Defected_Volume
*        - Location
*      properties:
*        Date_From:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date_From
*        Date_To:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date_To
*        AccumilativePanelsNo:
*          type: integer
*          description: AccumilativePanelsNo
*        Planned_Panels:
*          type: integer
*          description: Planned_Panels
*        Planned_Time:
*          type: number
*          description: Planned_Time
*        Breakdown:
*          type: number
*          description: Breakdown
*        Periodic_Maintenance:
*          type: number
*          description: Periodic_Maintenance
*        Cutter_Maintenance:
*          type: number
*          description: Cutter_Maintenance
*        Interruption:
*          type: number
*          description: Interruption
*        Available_Time:
*          type: number
*          description: Available_Time
*        Site_Quality:
*          type: number
*          description: Site_Quality
*        OEE:
*          type: number
*          description: OEE
*        Progress:
*          type: number
*          description: Progress
*        Availability:
*          type: number
*          description: Availability
*        Target_Volume:
*          type: number
*          description: Target_Volume
*        Actual_Volume:
*          type: number
*          description: Actual_Volume
*        Site_Performance:
*          type: number
*          description: Site_Performance
*        AccumilativeVolume:
*          type: number
*          description: AccumilativeVolume
*        Defected_Volume:
*          type: number
*          description: Defected_Volume
*        Location:
*          type: string
*          description: Location
*/

/**
*  @swagger
* tags:
*   name: Site_Performance
*   description: Site_Performance Table API
* /api/v1/Site_Performance:
*   get:
*     summary: List All Site_Performance Table
*     tags: [Site_Performance]
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
*           example: "SELECT * FROM Site_Performance WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Site_Performance Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Site_Performance'
*   post:
*     summary: Create New Site_Performance
*     tags: [Site_Performance]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Site_Performance'
*     responses:
*       200:
*         description: The Created Site_Performance.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Site_Performance/{ID}:
*   get:
*     summary: Get The Site_Performance Row by id
*     tags: [Site_Performance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Site_Performance id
*     responses:
*       200:
*         description: The Site_Performance response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance'
*   put:
*     summary: Update The Site_Performance by id
*     tags: [Site_Performance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Site_Performance id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Site_Performance'
*     responses:
*       200:
*         description: The Site_Performance Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Site_Performance Row by id
*     tags: [Site_Performance]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Site_Performance id
*     responses:
*       200:
*         description: The Site_Performance response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance'
*/

const express = require('express');
const router = express.Router();
const {getAllSite_Performance} = require('../controllers/Site_Performance')
const {getSite_Performance} = require('../controllers/Site_Performance')
const {addSite_Performance} = require('../controllers/Site_Performance')
const {updateSite_Performance} = require('../controllers/Site_Performance')
const {deleteSite_Performance} = require('../controllers/Site_Performance')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllSite_Performance)

router.get('/:id', getSite_Performance)

router.post('/', addSite_Performance)

router.put('/:id', updateSite_Performance)

router.delete('/:id', deleteSite_Performance)

module.exports = router