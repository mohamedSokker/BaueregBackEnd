/**
 * @swagger
 * components:
 *   schemas:
 *    BG2000:
 *      type: object
 *      required:
 *        - DateTime
 *        - Location
 *        - Equipment
 *        - HydTank_ReplaceReturnFilter
 *        - HydTank_ReplaceLineFilter
 *        - HydTank_ReplacePilotFilter
 *        - HydTank_ReplaceRotaryDriveFilter
 *        - HydTank_ReplaceFreefallFilter
 *        - HydTank_ReplaceFillerFilter
 *        - Swing_RetensionMountingBolts
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
 *        HydTank_ReplaceReturnFilter:
 *          type: string
 *          description: HydTank_ReplaceReturnFilter
 *        HydTank_ReplaceLineFilter:
 *          type: string
 *          description: HydTank_ReplaceLineFilter
 *        HydTank_ReplacePilotFilter:
 *          type: string
 *          description: HydTank_ReplacePilotFilter
 *        HydTank_ReplaceRotaryDriveFilter:
 *          type: string
 *          description: HydTank_ReplaceRotaryDriveFilter
 *        HydTank_ReplaceFreefallFilter:
 *          type: string
 *          description: HydTank_ReplaceFreefallFilter
 *        HydTank_ReplaceFillerFilter:
 *          type: string
 *          description: HydTank_ReplaceFillerFilter
 *        Swing_RetensionMountingBolts:
 *          type: string
 *          description: Swing_RetensionMountingBolts
 *        Remarks:
 *          type: string
 *          description: Remarks
 */

/**
 *  @swagger
 * tags:
 *   name: BG2000
 *   description: BG2000 Table API
 * /api/v1/BG2000:
 *   get:
 *     summary: List All BG2000 Table
 *     tags: [BG2000]
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
 *         description: The List Of The BG2000 Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BG2000'
 *   post:
 *     summary: Create New BG2000
 *     tags: [BG2000]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BG2000'
 *     responses:
 *       200:
 *         description: The Created BG2000.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BG2000'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/BG2000/{ID}:
 *   get:
 *     summary: Get The BG2000 Row by id
 *     tags: [BG2000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BG2000 id
 *     responses:
 *       200:
 *         description: The BG2000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BG2000'
 *   put:
 *     summary: Update The BG2000 by id
 *     tags: [BG2000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The BG2000 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BG2000'
 *     responses:
 *       200:
 *         description: The BG2000 Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BG2000'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove BG2000 Row by id
 *     tags: [BG2000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BG2000 id
 *     responses:
 *       200:
 *         description: The BG2000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BG2000'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBG2000} = require('../controllers/BG2000')
const {getBG2000} = require('../controllers/BG2000')
const {addBG2000} = require('../controllers/BG2000')
const {updateBG2000} = require('../controllers/BG2000')
const {deleteBG2000} = require('../controllers/BG2000')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBG2000)

router.get('/:id', getBG2000)

router.post('/', addBG2000)

router.put('/:id', updateBG2000)

router.delete('/:id', deleteBG2000)

module.exports = router