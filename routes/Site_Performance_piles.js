/**
* @swagger
* components:
*   schemas:
*    Site_Performance_piles:
*      type: object
*      required:
*        - Date_From
*        - Date_To
*        - AccumilativePilesNo
*        - Planned_Piles
*        - Planned_Time
*        - Breakdown
*        - Periodic_Maintenance
*        - Kelly_Maintenance
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
*        AccumilativePilesNo:
*          type: integer
*          description: AccumilativePilesNo
*        Planned_Piles:
*          type: integer
*          description: Planned_Piles
*        Planned_Time:
*          type: number
*          description: Planned_Time
*        Breakdown:
*          type: number
*          description: Breakdown
*        Periodic_Maintenance:
*          type: number
*          description: Periodic_Maintenance
*        Kelly_Maintenance:
*          type: number
*          description: Kelly_Maintenance
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
*   name: Site_Performance_piles
*   description: Site_Performance_piles Table API
* /api/v1/Site_Performance_piles:
*   get:
*     summary: List All Site_Performance_piles Table
*     tags: [Site_Performance_piles]
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
*           example: "SELECT * FROM Site_Performance_piles WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Site_Performance_piles Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Site_Performance_piles'
*   post:
*     summary: Create New Site_Performance_piles
*     tags: [Site_Performance_piles]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Site_Performance_piles'
*     responses:
*       200:
*         description: The Created Site_Performance_piles.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance_piles'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Site_Performance_piles/{ID}:
*   get:
*     summary: Get The Site_Performance_piles Row by id
*     tags: [Site_Performance_piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Site_Performance_piles id
*     responses:
*       200:
*         description: The Site_Performance_piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance_piles'
*   put:
*     summary: Update The Site_Performance_piles by id
*     tags: [Site_Performance_piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Site_Performance_piles id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Site_Performance_piles'
*     responses:
*       200:
*         description: The Site_Performance_piles Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance_piles'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Site_Performance_piles Row by id
*     tags: [Site_Performance_piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Site_Performance_piles id
*     responses:
*       200:
*         description: The Site_Performance_piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Site_Performance_piles'
*/

const express = require('express');
const router = express.Router();
const {getAllSite_Performance_piles} = require('../controllers/Site_Performance_piles')
const {getSite_Performance_piles} = require('../controllers/Site_Performance_piles')
const {addSite_Performance_piles} = require('../controllers/Site_Performance_piles')
const {updateSite_Performance_piles} = require('../controllers/Site_Performance_piles')
const {deleteSite_Performance_piles} = require('../controllers/Site_Performance_piles')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllSite_Performance_piles)

router.get('/:id', getSite_Performance_piles)

router.post('/', addSite_Performance_piles)

router.put('/:id', updateSite_Performance_piles)

router.delete('/:id', deleteSite_Performance_piles)

module.exports = router