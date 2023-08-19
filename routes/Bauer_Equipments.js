/**
 * @swagger
 * components:
 *   schemas:
 *    Bauer_Equipments:
 *      type: object
 *      required:
 *        - Equipment_Type
 *        - Equipment_Model
 *        - Equipment
 *        - UnderCarrage_Type
 *      properties:
 *        Equipment_Type:
 *          type: string
 *          description: Equipment_Type
 *        Equipment_Model:
 *          type: string
 *          description: Equipment_Model
 *        Equipment:
 *          type: string
 *          description: Equipment
 *        UnderCarrage_Type:
 *          type: string
 *          description: UnderCarrage_Type
 */

/**
 *  @swagger
 * tags:
 *   name: Bauer_Equipments
 *   description: Bauer_Equipments Table API
 * /api/v1/Bauer_Equipments:
 *   get:
 *     summary: List All Bauer_Equipments Table
 *     tags: [Bauer_Equipments]
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
 *         description: The List Of The Bauer_Equipments Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bauer_Equipments'
 *   post:
 *     summary: Create New Bauer_Equipments
 *     tags: [Bauer_Equipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bauer_Equipments'
 *     responses:
 *       200:
 *         description: The Created Bauer_Equipments.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/Bauer_Equipments/{ID}:
 *   get:
 *     summary: Get The Bauer_Equipments Row by id
 *     tags: [Bauer_Equipments]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Bauer_Equipments id
 *     responses:
 *       200:
 *         description: The Bauer_Equipments response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments'
 *   put:
 *     summary: Update The Bauer_Equipments by id
 *     tags: [Bauer_Equipments]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The Bauer_Equipments id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bauer_Equipments'
 *     responses:
 *       200:
 *         description: The Bauer_Equipments Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove Bauer_Equipments Row by id
 *     tags: [Bauer_Equipments]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Bauer_Equipments id
 *     responses:
 *       200:
 *         description: The Bauer_Equipments response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBauer_Equipments} = require('../controllers/Bauer_Equipments')
const {getBauer_Equipments} = require('../controllers/Bauer_Equipments')
const {addBauer_Equipments} = require('../controllers/Bauer_Equipments')
const {updateBauer_Equipments} = require('../controllers/Bauer_Equipments')
const {deleteBauer_Equipments} = require('../controllers/Bauer_Equipments')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBauer_Equipments)

router.get('/:id', getBauer_Equipments)

router.post('/', addBauer_Equipments)

router.put('/:id', updateBauer_Equipments)

router.delete('/:id', deleteBauer_Equipments)

module.exports = router