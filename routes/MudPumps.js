/**
* @swagger
* components:
*   schemas:
*    MudPumps:
*      type: object
*      required:
*        - Start_Date
*        - End_Date
*        - Equipment
*        - Location
*        - Code
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
*        Equipment:
*          type: string
*          description: Equipment
*        Location:
*          type: string
*          description: Location
*        Code:
*          type: string
*          description: Code
*        Status:
*          type: string
*          description: Status
*/

/**
*  @swagger
* tags:
*   name: MudPumps
*   description: MudPumps Table API
* /api/v1/MudPumps:
*   get:
*     summary: List All MudPumps Table
*     tags: [MudPumps]
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
*           example: "SELECT * FROM MudPumps WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The MudPumps Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/MudPumps'
*   post:
*     summary: Create New MudPumps
*     tags: [MudPumps]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/MudPumps'
*     responses:
*       200:
*         description: The Created MudPumps.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/MudPumps'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/MudPumps/{ID}:
*   get:
*     summary: Get The MudPumps Row by id
*     tags: [MudPumps]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The MudPumps id
*     responses:
*       200:
*         description: The MudPumps response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/MudPumps'
*   put:
*     summary: Update The MudPumps by id
*     tags: [MudPumps]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The MudPumps id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/MudPumps'
*     responses:
*       200:
*         description: The MudPumps Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/MudPumps'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove MudPumps Row by id
*     tags: [MudPumps]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The MudPumps id
*     responses:
*       200:
*         description: The MudPumps response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/MudPumps'
*/

const express = require('express');
const router = express.Router();
const {getAllMudPumps} = require('../controllers/MudPumps')
const {getMudPumps} = require('../controllers/MudPumps')
const {addMudPumps} = require('../controllers/MudPumps')
const {updateMudPumps} = require('../controllers/MudPumps')
const {deleteMudPumps} = require('../controllers/MudPumps')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllMudPumps)

router.get('/:id', getMudPumps)

router.post('/', addMudPumps)

router.put('/:id', updateMudPumps)

router.delete('/:id', deleteMudPumps)

module.exports = router