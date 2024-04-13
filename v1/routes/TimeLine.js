/**
* @swagger
* components:
*   schemas:
*    TimeLine:
*      type: object
*      required:
*        - PanelDataID
*        - StartTime
*        - EndTime
*        - Location
*        - Equipment
*        - Activity
*      properties:
*        PanelDataID:
*          type: integer
*          description: PanelDataID
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
*   name: TimeLine
*   description: TimeLine Table API
* /api/v1/TimeLine:
*   get:
*     summary: List All TimeLine Table
*     tags: [TimeLine]
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
*           example: "SELECT * FROM TimeLine WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The TimeLine Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/TimeLine'
*   post:
*     summary: Create New TimeLine
*     tags: [TimeLine]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TimeLine'
*     responses:
*       200:
*         description: The Created TimeLine.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/TimeLine/{ID}:
*   get:
*     summary: Get The TimeLine Row by id
*     tags: [TimeLine]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TimeLine id
*     responses:
*       200:
*         description: The TimeLine response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine'
*   put:
*     summary: Update The TimeLine by id
*     tags: [TimeLine]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The TimeLine id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TimeLine'
*     responses:
*       200:
*         description: The TimeLine Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove TimeLine Row by id
*     tags: [TimeLine]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The TimeLine id
*     responses:
*       200:
*         description: The TimeLine response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/TimeLine'
*/

const express = require('express');
const router = express.Router();
const {getAllTimeLine} = require('../controllers/TimeLine')
const {getTimeLine} = require('../controllers/TimeLine')
const {addTimeLine} = require('../controllers/TimeLine')
const {updateTimeLine} = require('../controllers/TimeLine')
const {deleteTimeLine} = require('../controllers/TimeLine')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllTimeLine)

router.get('/:id', getTimeLine)

router.post('/', addTimeLine)

router.put('/:id', updateTimeLine)

router.delete('/:id', deleteTimeLine)

module.exports = router