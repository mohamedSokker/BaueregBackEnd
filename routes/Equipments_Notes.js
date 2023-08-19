/**
* @swagger
* components:
*   schemas:
*    Equipments_Notes:
*      type: object
*      required:
*        - Note
*        - Equipment
*      properties:
*        Note:
*          type: string
*          description: Note
*        Equipment:
*          type: string
*          description: Equipment
*/

/**
*  @swagger
* tags:
*   name: Equipments_Notes
*   description: Equipments_Notes Table API
* /api/v1/Equipments_Notes:
*   get:
*     summary: List All Equipments_Notes Table
*     tags: [Equipments_Notes]
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
*           example: "SELECT * FROM Equipments_Notes WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Equipments_Notes Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Equipments_Notes'
*   post:
*     summary: Create New Equipments_Notes
*     tags: [Equipments_Notes]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipments_Notes'
*     responses:
*       200:
*         description: The Created Equipments_Notes.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Notes'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Equipments_Notes/{ID}:
*   get:
*     summary: Get The Equipments_Notes Row by id
*     tags: [Equipments_Notes]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipments_Notes id
*     responses:
*       200:
*         description: The Equipments_Notes response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Notes'
*   put:
*     summary: Update The Equipments_Notes by id
*     tags: [Equipments_Notes]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Equipments_Notes id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Equipments_Notes'
*     responses:
*       200:
*         description: The Equipments_Notes Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Notes'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Equipments_Notes Row by id
*     tags: [Equipments_Notes]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Equipments_Notes id
*     responses:
*       200:
*         description: The Equipments_Notes response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Equipments_Notes'
*/

const express = require('express');
const router = express.Router();
const {getAllEquipments_Notes} = require('../controllers/Equipments_Notes')
const {getEquipments_Notes} = require('../controllers/Equipments_Notes')
const {addEquipments_Notes} = require('../controllers/Equipments_Notes')
const {updateEquipments_Notes} = require('../controllers/Equipments_Notes')
const {deleteEquipments_Notes} = require('../controllers/Equipments_Notes')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllEquipments_Notes)

router.get('/:id', getEquipments_Notes)

router.post('/', addEquipments_Notes)

router.put('/:id', updateEquipments_Notes)

router.delete('/:id', deleteEquipments_Notes)

module.exports = router