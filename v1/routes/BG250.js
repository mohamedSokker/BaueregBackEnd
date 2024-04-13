/**
 * @swagger
 * components:
 *   schemas:
 *    BG250:
 *      type: object
 *      required:
 *        - DateTime
 *        - Location
 *        - Equipment
 *        - Crawler_CheckOilLevel
 *        - Diesel_ChangeFuelFilter
 *        - Diesel_ChangeEngineOilAndFilter
 *        - Diesel_ChangeEngineAirFilter
 *        - Swing_GreaseBallBearingRace
 *        - Kelly_CheckForWear
 *        - Crawler_CheckDriveWheels
 *        - Remarks
 *      properties:
 *        DateTime:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02'
 *          description: DateTime
 *        Location:
 *          type: string
 *          description: Location
 *        Equipment:
 *          type: string
 *          description: Equipment
 *        Crawler_CheckOilLevel:
 *          type: string
 *          description: Crawler_CheckOilLevel
 *        Diesel_ChangeFuelFilter:
 *          type: string
 *          description: Diesel_ChangeFuelFilter
 *        Diesel_ChangeEngineOilAndFilter:
 *          type: string
 *          description: Diesel_ChangeEngineOilAndFilter
 *        Diesel_ChangeEngineAirFilter:
 *          type: string
 *          description: Diesel_ChangeEngineAirFilter
 *        Swing_GreaseBallBearingRace:
 *          type: string
 *          description: Swing_GreaseBallBearingRace
 *        Kelly_CheckForWear:
 *          type: string
 *          description: Kelly_CheckForWear
 *        Crawler_CheckDriveWheels:
 *          type: string
 *          description: Crawler_CheckDriveWheels
 *        Remarks:
 *          type: string
 *          description: Remarks
 */

/**
 *  @swagger
 * tags:
 *   name: BG250
 *   description: BG250 Table API
 * /api/v1/BG250:
 *   get:
 *     summary: List All BG250 Table
 *     tags: [BG250]
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
 *           example: "SELECT * FROM BG250 WHERE Location= 'Banha'"
 *     responses:
 *       200:
 *         description: The List Of The BG250 Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BG250'
 *   post:
 *     summary: Create New BG250
 *     tags: [BG250]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BG250'
 *     responses:
 *       200:
 *         description: The Created BG250.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BG250'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/BG250/{ID}:
 *   get:
 *     summary: Get The BG250 Row by id
 *     tags: [BG250]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BG250 id
 *     responses:
 *       200:
 *         description: The BG250 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BG250'
 *   put:
 *     summary: Update The BG250 by id
 *     tags: [BG250]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The BG250 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BG250'
 *     responses:
 *       200:
 *         description: The BG250 Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BG250'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove BG250 Row by id
 *     tags: [BG250]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BG250 id
 *     responses:
 *       200:
 *         description: The BG250 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BG250'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBG250} = require('../controllers/BG250')
const {getBG250} = require('../controllers/BG250')
const {addBG250} = require('../controllers/BG250')
const {updateBG250} = require('../controllers/BG250')
const {deleteBG250} = require('../controllers/BG250')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBG250)

router.get('/:id', getBG250)

router.post('/', addBG250)

router.put('/:id', updateBG250)

router.delete('/:id', deleteBG250)

module.exports = router