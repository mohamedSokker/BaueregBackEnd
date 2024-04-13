/**
 * @swagger
 * components:
 *   schemas:
 *    BC1000:
 *      type: object
 *      required:
 *        - DateTime
 *        - Location
 *        - Equipment
 *        - Diesel_ReplaceAirFilter
 *        - PumpDistributor_ChangeOil
 *        - Swing_ChangeOil
 *        - CrawlerDrive_ChangeOil
 *        - Winches_ChangeMainWinchOil
 *        - Winches_ChangeBoomWinchOil
 *        - Winches_ChangeHoseTensionWinchOil
 *        - PullyBlock_ChangeOil
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
 *        PumpDistributor_ChangeOil:
 *          type: string
 *          description: PumpDistributor_ChangeOil
 *        Swing_ChangeOil:
 *          type: string
 *          description: Swing_ChangeOil
 *        CrawlerDrive_ChangeOil:
 *          type: string
 *          description: CrawlerDrive_ChangeOil
 *        Winches_ChangeMainWinchOil:
 *          type: string
 *          description: Winches_ChangeMainWinchOil
 *        Winches_ChangeBoomWinchOil:
 *          type: string
 *          description: Winches_ChangeBoomWinchOil
 *        Winches_ChangeHoseTensionWinchOil:
 *          type: string
 *          description: Winches_ChangeHoseTensionWinchOil
 *        PullyBlock_ChangeOil:
 *          type: string
 *          description: PullyBlock_ChangeOil
 *        Remarks:
 *          type: string
 *          description: Remarks
 */

/**
 *  @swagger
 * tags:
 *   name: BC1000
 *   description: BC1000 Table API
 * /api/v1/BC1000:
 *   get:
 *     summary: List All BC1000 Table
 *     tags: [BC1000]
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
 *         description: The List Of The BC1000 Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BC1000'
 *   post:
 *     summary: Create New BC1000
 *     tags: [BC1000]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BC1000'
 *     responses:
 *       200:
 *         description: The Created BC1000.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BC1000'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/BC1000/{ID}:
 *   get:
 *     summary: Get The BC1000 Row by id
 *     tags: [BC1000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BC1000 id
 *     responses:
 *       200:
 *         description: The BC1000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BC1000'
 *   put:
 *     summary: Update The BC1000 by id
 *     tags: [BC1000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The BC1000 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BC1000'
 *     responses:
 *       200:
 *         description: The BC1000 Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BC1000'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove BC1000 Row by id
 *     tags: [BC1000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BC1000 id
 *     responses:
 *       200:
 *         description: The BC1000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BC1000'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBC1000} = require('../controllers/BC1000')
const {getBC1000} = require('../controllers/BC1000')
const {addBC1000} = require('../controllers/BC1000')
const {updateBC1000} = require('../controllers/BC1000')
const {deleteBC1000} = require('../controllers/BC1000')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBC1000)

router.get('/:id', getBC1000)

router.post('/', addBC1000)

router.put('/:id', updateBC1000)

router.delete('/:id', deleteBC1000)

module.exports = router