/**
* @swagger
* components:
*   schemas:
*    Kelly_Location:
*      type: object
*      required:
*        - Start_Date
*        - End_Date
*        - Type
*        - Code
*        - Equipment Type
*        - Location 
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
*        Type:
*          type: string
*          description: Type
*        Code:
*          type: string
*          description: Code
*        Equipment Type:
*          type: string
*          description: Equipment Type
*        Location :
*          type: string
*          description: Location 
*        Status:
*          type: string
*          description: Status
*/

/**
*  @swagger
* tags:
*   name: Kelly_Location
*   description: Kelly_Location Table API
* /api/v1/Kelly_Location:
*   get:
*     summary: List All Kelly_Location Table
*     tags: [Kelly_Location]
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
*           example: "SELECT * FROM Kelly_Location WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Kelly_Location Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Kelly_Location'
*   post:
*     summary: Create New Kelly_Location
*     tags: [Kelly_Location]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Kelly_Location'
*     responses:
*       200:
*         description: The Created Kelly_Location.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Kelly_Location'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Kelly_Location/{ID}:
*   get:
*     summary: Get The Kelly_Location Row by id
*     tags: [Kelly_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Kelly_Location id
*     responses:
*       200:
*         description: The Kelly_Location response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Kelly_Location'
*   put:
*     summary: Update The Kelly_Location by id
*     tags: [Kelly_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Kelly_Location id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Kelly_Location'
*     responses:
*       200:
*         description: The Kelly_Location Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Kelly_Location'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Kelly_Location Row by id
*     tags: [Kelly_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Kelly_Location id
*     responses:
*       200:
*         description: The Kelly_Location response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Kelly_Location'
*/

const express = require('express');
const router = express.Router();
const {getAllKelly_Location} = require('../controllers/Kelly_Location')
const {getKelly_Location} = require('../controllers/Kelly_Location')
const {addKelly_Location} = require('../controllers/Kelly_Location')
const {updateKelly_Location} = require('../controllers/Kelly_Location')
const {deleteKelly_Location} = require('../controllers/Kelly_Location')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllKelly_Location)

router.get('/:id', getKelly_Location)

router.post('/', addKelly_Location)

router.put('/:id', updateKelly_Location)

router.delete('/:id', deleteKelly_Location)

module.exports = router