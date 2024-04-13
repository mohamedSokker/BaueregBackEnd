/**
* @swagger
* components:
*   schemas:
*    Equipments_Location:
*      type: object
*      required:
*        - Start_Date
*        - End_Date
*        - Equipment
*        - Location
*        - UnderCarrage_Type
*        - Equipment_Type
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
*        UnderCarrage_Type:
*          type: string
*          description: UnderCarrage_Type
*        Equipment_Type:
*          type: string
*          description: Equipment_Type
*/

/**
*  @swagger
* tags:
*   name: Equipments_Location
*   description: Equipments_Location Table API
* /api/v1/Equipments_Location:
*   get:
*     summary: List All Equipments_Location Table
*     tags: [Equipments_Location]
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
*           example: "SELECT * FROM Equipments_Location WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Equipments_Location Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Equipments_Location'
*   post:
*     summary: Create New Equipments_Location
*     tags: [Equipments_Location]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipments_Location'
*     responses:
*       200:
*         description: The Created Equipments_Location.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Location'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Equipments_Location/{ID}:
*   get:
*     summary: Get The Equipments_Location Row by id
*     tags: [Equipments_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipments_Location id
*     responses:
*       200:
*         description: The Equipments_Location response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Location'
*   put:
*     summary: Update The Equipments_Location by id
*     tags: [Equipments_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Equipments_Location id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipments_Location'
*     responses:
*       200:
*         description: The Equipments_Location Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Location'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Equipments_Location Row by id
*     tags: [Equipments_Location]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipments_Location id
*     responses:
*       200:
*         description: The Equipments_Location response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Location'
*/

const express = require('express');
const router = express.Router();
const {getAllEquipments_Location} = require('../controllers/Equipments_Location')
const {getEquipments_Location} = require('../controllers/Equipments_Location')
const {addEquipments_Location} = require('../controllers/Equipments_Location')
const {updateEquipments_Location} = require('../controllers/Equipments_Location')
const {deleteEquipments_Location} = require('../controllers/Equipments_Location')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllEquipments_Location)

router.get('/:id', getEquipments_Location)

router.post('/', addEquipments_Location)

router.put('/:id', updateEquipments_Location)

router.delete('/:id', deleteEquipments_Location)

module.exports = router