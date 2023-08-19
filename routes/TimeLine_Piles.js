/**
* @swagger
* components:
*   schemas:
*    TimeLine_Piles:
*      type: object
*      required:
*        - PileDataID
*        - StartTime
*        - EndTime
*        - Location
*        - Equipment
*        - Activity
*      properties:
*        PileDataID:
*          type: integer
*          description: PileDataID
*        StartTime:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: StartTime
*        EndTime:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: EndTime
*        Location:
*          type: string
*          description: Location
*        Equipment:
*          type: string
*          description: Equipment
*        Activity:
*          type: string
*          description: Activity
*/

/**
*  @swagger
* tags:
*   name: TimeLine_Piles
*   description: TimeLine_Piles Table API
* /api/v1/TimeLine_Piles:
*   get:
*     summary: List All TimeLine_Piles Table
*     tags: [TimeLine_Piles]
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
*           example: "SELECT * FROM TimeLine_Piles WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The TimeLine_Piles Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/TimeLine_Piles'
*   post:
*     summary: Create New TimeLine_Piles
*     tags: [TimeLine_Piles]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TimeLine_Piles'
*     responses:
*       200:
*         description: The Created TimeLine_Piles.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine_Piles'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/TimeLine_Piles/{ID}:
*   get:
*     summary: Get The TimeLine_Piles Row by id
*     tags: [TimeLine_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TimeLine_Piles id
*     responses:
*       200:
*         description: The TimeLine_Piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine_Piles'
*   put:
*     summary: Update The TimeLine_Piles by id
*     tags: [TimeLine_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The TimeLine_Piles id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TimeLine_Piles'
*     responses:
*       200:
*         description: The TimeLine_Piles Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine_Piles'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove TimeLine_Piles Row by id
*     tags: [TimeLine_Piles]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TimeLine_Piles id
*     responses:
*       200:
*         description: The TimeLine_Piles response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine_Piles'
*/

const express = require('express');
const router = express.Router();
const {getAllTimeLine_Piles} = require('../controllers/TimeLine_Piles')
const {getTimeLine_Piles} = require('../controllers/TimeLine_Piles')
const {addTimeLine_Piles} = require('../controllers/TimeLine_Piles')
const {updateTimeLine_Piles} = require('../controllers/TimeLine_Piles')
const {deleteTimeLine_Piles} = require('../controllers/TimeLine_Piles')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllTimeLine_Piles)

router.get('/:id', getTimeLine_Piles)

router.post('/', addTimeLine_Piles)

router.put('/:id', updateTimeLine_Piles)

router.delete('/:id', deleteTimeLine_Piles)

module.exports = router