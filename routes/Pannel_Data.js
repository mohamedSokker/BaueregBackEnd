/**
* @swagger
* components:
*   schemas:
*    Pannel_Data:
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
*        - Pannel_Width
*        - Pannel_Length
*        - Pannel_Depth
*        - Pannel_Volume
*        - Excavation_Duration
*        - Washing_Duration
*        - Exchange_Duration
*        - Steel_Duration
*        - Concrete_Duration
*        - Total_Time
*        - Location
*        - Equipment
*        - Pannel_Type
*        - Pannel_Name
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
*        Pannel_Width:
*          type: number
*          description: Pannel_Width
*        Pannel_Length:
*          type: number
*          description: Pannel_Length
*        Pannel_Depth:
*          type: number
*          description: Pannel_Depth
*        Pannel_Volume:
*          type: number
*          description: Pannel_Volume
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
*        Pannel_Type:
*          type: string
*          description: Pannel_Type
*        Pannel_Name:
*          type: string
*          description: Pannel_Name
*/

/**
*  @swagger
* tags:
*   name: Pannel_Data
*   description: Pannel_Data Table API
* /api/v1/Pannel_Data:
*   get:
*     summary: List All Pannel_Data Table
*     tags: [Pannel_Data]
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
*           example: "SELECT * FROM Pannel_Data WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Pannel_Data Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Pannel_Data'
*   post:
*     summary: Create New Pannel_Data
*     tags: [Pannel_Data]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Pannel_Data'
*     responses:
*       200:
*         description: The Created Pannel_Data.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Pannel_Data'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Pannel_Data/{ID}:
*   get:
*     summary: Get The Pannel_Data Row by id
*     tags: [Pannel_Data]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Pannel_Data id
*     responses:
*       200:
*         description: The Pannel_Data response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Pannel_Data'
*   put:
*     summary: Update The Pannel_Data by id
*     tags: [Pannel_Data]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Pannel_Data id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Pannel_Data'
*     responses:
*       200:
*         description: The Pannel_Data Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Pannel_Data'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Pannel_Data Row by id
*     tags: [Pannel_Data]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Pannel_Data id
*     responses:
*       200:
*         description: The Pannel_Data response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Pannel_Data'
*/

const express = require('express');
const router = express.Router();
const {getAllPannel_Data} = require('../controllers/Pannel_Data')
const {getPannel_Data} = require('../controllers/Pannel_Data')
const {addPannel_Data} = require('../controllers/Pannel_Data')
const {updatePannel_Data} = require('../controllers/Pannel_Data')
const {deletePannel_Data} = require('../controllers/Pannel_Data')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllPannel_Data)

router.get('/:id', getPannel_Data)

router.post('/', addPannel_Data)

router.put('/:id', updatePannel_Data)

router.delete('/:id', deletePannel_Data)

module.exports = router