/**
* @swagger
* components:
*   schemas:
*    Holidays:
*      type: object
*      required:
*        - DateTime
*        - Location
*      properties:
*        DateTime:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: DateTime
*        Location:
*          type: string
*          description: Location
*/

/**
*  @swagger
* tags:
*   name: Holidays
*   description: Holidays Table API
* /api/v1/Holidays:
*   get:
*     summary: List All Holidays Table
*     tags: [Holidays]
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
*           example: "SELECT * FROM Holidays WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Holidays Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Holidays'
*   post:
*     summary: Create New Holidays
*     tags: [Holidays]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Holidays'
*     responses:
*       200:
*         description: The Created Holidays.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Holidays'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Holidays/{ID}:
*   get:
*     summary: Get The Holidays Row by id
*     tags: [Holidays]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Holidays id
*     responses:
*       200:
*         description: The Holidays response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Holidays'
*   put:
*     summary: Update The Holidays by id
*     tags: [Holidays]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Holidays id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Holidays'
*     responses:
*       200:
*         description: The Holidays Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Holidays'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Holidays Row by id
*     tags: [Holidays]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Holidays id
*     responses:
*       200:
*         description: The Holidays response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Holidays'
*/

const express = require('express');
const router = express.Router();
const {getAllHolidays} = require('../controllers/Holidays')
const {getHolidays} = require('../controllers/Holidays')
const {addHolidays} = require('../controllers/Holidays')
const {updateHolidays} = require('../controllers/Holidays')
const {deleteHolidays} = require('../controllers/Holidays')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllHolidays)

router.get('/:id', getHolidays)

router.post('/', addHolidays)

router.put('/:id', updateHolidays)

router.delete('/:id', deleteHolidays)

module.exports = router