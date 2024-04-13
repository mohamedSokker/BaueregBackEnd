/**
 * @swagger
 * components:
 *   schemas:
 *    BG1000:
 *      type: object
 *      required:
 *        - DateTime
 *        - Location
 *        - Equipment
 *        - Diesel_ReplaceAirFilter
 *        - Crawler_ChangeOil
 *        - PumpDistributor_ChangeOil
 *        - BoomMainWinch_ChangeOil
 *        - BoomAuxWinch_ChangeOil
 *        - CrowdWinch_ChangeOil
 *        - RotaryDrive_ChangeOil
 *        - RotaryDrive_ReplaceFilter
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
 *        Diesel_ReplaceAirFilter:
 *          type: string
 *          description: Diesel_ReplaceAirFilter
 *        Crawler_ChangeOil:
 *          type: string
 *          description: Crawler_ChangeOil
 *        PumpDistributor_ChangeOil:
 *          type: string
 *          description: PumpDistributor_ChangeOil
 *        BoomMainWinch_ChangeOil:
 *          type: string
 *          description: BoomMainWinch_ChangeOil
 *        BoomAuxWinch_ChangeOil:
 *          type: string
 *          description: BoomAuxWinch_ChangeOil
 *        CrowdWinch_ChangeOil:
 *          type: string
 *          description: CrowdWinch_ChangeOil
 *        RotaryDrive_ChangeOil:
 *          type: string
 *          description: RotaryDrive_ChangeOil
 *        RotaryDrive_ReplaceFilter:
 *          type: string
 *          description: RotaryDrive_ReplaceFilter
 *        Remarks:
 *          type: string
 *          description: Remarks
 */

/**
 *  @swagger
 * tags:
 *   name: BG1000
 *   description: BG1000 Table API
 * /api/v1/BG1000:
 *   get:
 *     summary: List All BG1000 Table
 *     tags: [BG1000]
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
 *           example: "SELECT * FROM BG2000 WHERE Location= 'Banha'"
 *     responses:
 *       200:
 *         description: The List Of The BG1000 Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BG1000'
 *   post:
 *     summary: Create New BG1000
 *     tags: [BG1000]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BG1000'
 *     responses:
 *       200:
 *         description: The Created BG1000.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BG1000'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/BG1000/{ID}:
 *   get:
 *     summary: Get The BG1000 Row by id
 *     tags: [BG1000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BG1000 id
 *     responses:
 *       200:
 *         description: The BG1000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BG1000'
 *   put:
 *     summary: Update The BG1000 by id
 *     tags: [BG1000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The BG1000 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BG1000'
 *     responses:
 *       200:
 *         description: The BG1000 Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BG1000'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove BG1000 Row by id
 *     tags: [BG1000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BG1000 id
 *     responses:
 *       200:
 *         description: The BG1000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BG1000'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBG1000} = require('../controllers/BG1000')
const {getBG1000} = require('../controllers/BG1000')
const {addBG1000} = require('../controllers/BG1000')
const {updateBG1000} = require('../controllers/BG1000')
const {deleteBG1000} = require('../controllers/BG1000')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBG1000)

router.get('/:id', getBG1000)

router.post('/', addBG1000)

router.put('/:id', updateBG1000)

router.delete('/:id', deleteBG1000)

module.exports = router