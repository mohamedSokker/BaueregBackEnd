/**
 * @swagger
 * components:
 *   schemas:
 *    BC250:
 *      type: object
 *      required:
 *        - DateTime
 *        - Location
 *        - Equipment
 *        - Diesel_ChangeOil
 *        - Diesel_ChangeOilFilter
 *        - Diesel_ChangeFuelFilter
 *        - Diesel_ChangeAirFilter
 *        - CrawlerDrive_CheckOilLevel
 *        - CuttingGearbox_ChangeOil
 *        - MudPump_ChangeOil
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
 *        Diesel_ChangeOil:
 *          type: string
 *          description: Diesel_ChangeOil
 *        Diesel_ChangeOilFilter:
 *          type: string
 *          description: Diesel_ChangeOilFilter
 *        Diesel_ChangeFuelFilter:
 *          type: string
 *          description: Diesel_ChangeFuelFilter
 *        Diesel_ChangeAirFilter:
 *          type: string
 *          description: Diesel_ChangeAirFilter
 *        CrawlerDrive_CheckOilLevel:
 *          type: string
 *          description: CrawlerDrive_CheckOilLevel
 *        CuttingGearbox_ChangeOil:
 *          type: string
 *          description: CuttingGearbox_ChangeOil
 *        MudPump_ChangeOil:
 *          type: string
 *          description: MudPump_ChangeOil
 *        Remarks:
 *          type: string
 *          description: Remarks
 */

/**
 *  @swagger
 * tags:
 *   name: BC250
 *   description: BC250 Table API
 * /api/v1/BC250:
 *   get:
 *     summary: List All BC250 Table
 *     tags: [BC250]
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
 *         description: The List Of The BC250 Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BC250'
 *   post:
 *     summary: Create New BC250
 *     tags: [BC250]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BC250'
 *     responses:
 *       200:
 *         description: The Created BC250.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BC250'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/BC250/{ID}:
 *   get:
 *     summary: Get The BC250 Row by id
 *     tags: [BC250]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BC250 id
 *     responses:
 *       200:
 *         description: The BC250 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BC250'
 *   put:
 *     summary: Update The BC250 by id
 *     tags: [BC250]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The BC250 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BC250'
 *     responses:
 *       200:
 *         description: The BC250 Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BC250'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove BC250 Row by id
 *     tags: [BC250]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BC250 id
 *     responses:
 *       200:
 *         description: The BC250 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BC250'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBC250} = require('../controllers/BC250')
const {getBC250} = require('../controllers/BC250')
const {addBC250} = require('../controllers/BC250')
const {updateBC250} = require('../controllers/BC250')
const {deleteBC250} = require('../controllers/BC250')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBC250)

router.get('/:id', getBC250)

router.post('/', addBC250)

router.put('/:id', updateBC250)

router.delete('/:id', deleteBC250)

module.exports = router