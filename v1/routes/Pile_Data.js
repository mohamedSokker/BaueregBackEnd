/**
* @swagger
* components:
*   schemas:
*    Pile_Data:
*      type: object
*      required:
*        - Date_Time
*        - Date_From
*        - Date_To
*        - Start_Excavation
*        - End_Excavation
*        - Start_Washing
*        - End_Washing
*        - Start_Exchange
*        - End_Exchange
*        - Start_Steel
*        - End_Steel
*        - Start_Concrete
*        - End_Concrete
*        - Pile_Diameter
*        - Pile_Depth
*        - Pile_Volume
*        - Excavation_Duration
*        - Washing_Duration
*        - Exchange_Duration
*        - Steel_Duration
*        - Concrete_Duration
*        - Total_Time
*        - Location
*        - Equipment
*        - Pile_Name
*      properties:
*        Date_Time:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Date_Time
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
*        Start_Excavation:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Start_Excavation
*        End_Excavation:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: End_Excavation
*        Start_Washing:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Start_Washing
*        End_Washing:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: End_Washing
*        Start_Exchange:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Start_Exchange
*        End_Exchange:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: End_Exchange
*        Start_Steel:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Start_Steel
*        End_Steel:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: End_Steel
*        Start_Concrete:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: Start_Concrete
*        End_Concrete:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: End_Concrete
*        Pile_Diameter:
*          type: number
*          description: Pile_Diameter
*        Pile_Depth:
*          type: number
*          description: Pile_Depth
*        Pile_Volume:
*          type: number
*          description: Pile_Volume
*        Excavation_Duration:
*          type: number
*          description: Excavation_Duration
*        Washing_Duration:
*          type: number
*          description: Washing_Duration
*        Exchange_Duration:
*          type: number
*          description: Exchange_Duration
*        Steel_Duration:
*          type: number
*          description: Steel_Duration
*        Concrete_Duration:
*          type: number
*          description: Concrete_Duration
*        Total_Time:
*          type: number
*          description: Total_Time
*        Location:
*          type: string
*          description: Location
*        Equipment:
*          type: string
*          description: Equipment
*        Pile_Name:
*          type: string
*          description: Pile_Name
*/

/**
*  @swagger
* tags:
*   name: Pile_Data
*   description: Pile_Data Table API
* /api/v1/Pile_Data:
*   get:
*     summary: List All Pile_Data Table
*     tags: [Pile_Data]
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
*           example: "SELECT * FROM Pile_Data WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Pile_Data Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Pile_Data'
*   post:
*     summary: Create New Pile_Data
*     tags: [Pile_Data]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Pile_Data'
*     responses:
*       200:
*         description: The Created Pile_Data.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Pile_Data'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Pile_Data/{ID}:
*   get:
*     summary: Get The Pile_Data Row by id
*     tags: [Pile_Data]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Pile_Data id
*     responses:
*       200:
*         description: The Pile_Data response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Pile_Data'
*   put:
*     summary: Update The Pile_Data by id
*     tags: [Pile_Data]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Pile_Data id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Pile_Data'
*     responses:
*       200:
*         description: The Pile_Data Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Pile_Data'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Pile_Data Row by id
*     tags: [Pile_Data]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Pile_Data id
*     responses:
*       200:
*         description: The Pile_Data response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Pile_Data'
*/

const express = require('express');
const router = express.Router();
const {getAllPile_Data} = require('../controllers/Pile_Data')
const {getPile_Data} = require('../controllers/Pile_Data')
const {addPile_Data} = require('../controllers/Pile_Data')
const {updatePile_Data} = require('../controllers/Pile_Data')
const {deletePile_Data} = require('../controllers/Pile_Data')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllPile_Data)

router.get('/:id', getPile_Data)

router.post('/', addPile_Data)

router.put('/:id', updatePile_Data)

router.delete('/:id', deletePile_Data)

module.exports = router