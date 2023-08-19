/**
 * @swagger
 * components:
 *   schemas:
 *    Bauer_Breakdown:
 *      type: object
 *      required:
 *        - Trench_Cutting_Machine
 *        - Drilling_Machine
 *        - Heavy_Crane
 *        - Crane_25_Ton
 *        - Micro_Piling_Machine
 *        - Excavator
 *        - Forklift
 *      properties:
 *        Trench_Cutting_Machine:
 *          type: string
 *          description: Trench_Cutting_Machine
 *        Drilling_Machine:
 *          type: string
 *          description: Drilling_Machine
 *        Heavy_Crane:
 *          type: string
 *          description: Heavy_Crane
 *        Crane_25_Ton:
 *          type: string
 *          description: Crane_25_Ton
 *        Micro_Piling_Machine:
 *          type: string
 *          description: Micro_Piling_Machine
 *        Excavator:
 *          type: string
 *          description: Excavator
 *        Forklift:
 *          type: string
 *          description: Forklift
 */

/**
 *  @swagger
 * tags:
 *   name: Bauer_Breakdown
 *   description: Bauer_Breakdown Table API
 * /api/v1/Bauer_Breakdown:
 *   get:
 *     summary: List All Bauer_Breakdown Table
 *     tags: [Bauer_Breakdown]
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
 *         description: The List Of The Bauer_Breakdown Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bauer_Breakdown'
 *   post:
 *     summary: Create New Bauer_Breakdown
 *     tags: [Bauer_Breakdown]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bauer_Breakdown'
 *     responses:
 *       200:
 *         description: The Created Bauer_Breakdown.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Breakdown'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/Bauer_Breakdown/{ID}:
 *   get:
 *     summary: Get The Bauer_Breakdown Row by id
 *     tags: [Bauer_Breakdown]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Bauer_Breakdown id
 *     responses:
 *       200:
 *         description: The Bauer_Breakdown response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Breakdown'
 *   put:
 *     summary: Update The Bauer_Breakdown by id
 *     tags: [Bauer_Breakdown]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The Bauer_Breakdown id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bauer_Breakdown'
 *     responses:
 *       200:
 *         description: The Bauer_Breakdown Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Breakdown'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove Bauer_Breakdown Row by id
 *     tags: [Bauer_Breakdown]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Bauer_Breakdown id
 *     responses:
 *       200:
 *         description: The Bauer_Breakdown response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Breakdown'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBauer_Breakdown} = require('../controllers/Bauer_Breakdown')
const {getBauer_Breakdown} = require('../controllers/Bauer_Breakdown')
const {addBauer_Breakdown} = require('../controllers/Bauer_Breakdown')
const {updateBauer_Breakdown} = require('../controllers/Bauer_Breakdown')
const {deleteBauer_Breakdown} = require('../controllers/Bauer_Breakdown')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBauer_Breakdown)

router.get('/:id', getBauer_Breakdown)

router.post('/', addBauer_Breakdown)

router.put('/:id', updateBauer_Breakdown)

router.delete('/:id', deleteBauer_Breakdown)

module.exports = router