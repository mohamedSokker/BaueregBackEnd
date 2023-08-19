/**
* @swagger
* components:
*   schemas:
*    Engines:
*      type: object
*      required:
*        - Start_Date
*        - Manufacture_Year
*        - Power
*        - Equipment_Type
*        - Equipment
*        - Location
*        - End_Date
*        - Undercarriage_Type
*        - Engine_Type
*        - Aspiration_Type
*        - Engine_Serial
*        - Status
*        - Code
*      properties:
*        Start_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Start_Date
*        Manufacture_Year:
*          type: number
*          description: Manufacture_Year
*        Power:
*          type: number
*          description: Power
*        Equipment_Type:
*          type: string
*          description: Equipment_Type
*        Equipment:
*          type: string
*          description: Equipment
*        Location:
*          type: string
*          description: Location
*        End_Date:
*          type: string
*          description: End_Date
*        Undercarriage_Type:
*          type: string
*          description: Undercarriage_Type
*        Engine_Type:
*          type: string
*          description: Engine_Type
*        Aspiration_Type:
*          type: string
*          description: Aspiration_Type
*        Engine_Serial:
*          type: string
*          description: Engine_Serial
*        Status:
*          type: string
*          description: Status
*        Code:
*          type: string
*          description: Code
*/

/**
*  @swagger
* tags:
*   name: Engines
*   description: Engines Table API
* /api/v1/Engines:
*   get:
*     summary: List All Engines Table
*     tags: [Engines]
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
*           example: "SELECT * FROM Engines WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Engines Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Engines'
*   post:
*     summary: Create New Engines
*     tags: [Engines]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Engines'
*     responses:
*       200:
*         description: The Created Engines.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Engines'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Engines/{ID}:
*   get:
*     summary: Get The Engines Row by id
*     tags: [Engines]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Engines id
*     responses:
*       200:
*         description: The Engines response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Engines'
*   put:
*     summary: Update The Engines by id
*     tags: [Engines]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Engines id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Engines'
*     responses:
*       200:
*         description: The Engines Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Engines'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Engines Row by id
*     tags: [Engines]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Engines id
*     responses:
*       200:
*         description: The Engines response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Engines'
*/

const express = require('express');
const router = express.Router();
const {getAllEngines} = require('../controllers/Engines')
const {getEngines} = require('../controllers/Engines')
const {addEngines} = require('../controllers/Engines')
const {updateEngines} = require('../controllers/Engines')
const {deleteEngines} = require('../controllers/Engines')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllEngines)

router.get('/:id', getEngines)

router.post('/', addEngines)

router.put('/:id', updateEngines)

router.delete('/:id', deleteEngines)

module.exports = router