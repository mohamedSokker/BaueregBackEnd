/**
 * @swagger
 * components:
 *   schemas:
 *    Bauer_Equipments_Model:
 *      type: object
 *      required:
 *        - Equipment_Type
 *        - Equipment_Model
 *      properties:
 *        Equipment_Type:
 *          type: string
 *          description: Equipment_Type
 *        Equipment_Model:
 *          type: string
 *          description: Equipment_Model
 */

/**
 *  @swagger
 * tags:
 *   name: Bauer_Equipments_Model
 *   description: Bauer_Equipments_Model Table API
 * /api/v1/Bauer_Equipments_Model:
 *   get:
 *     summary: List All Bauer_Equipments_Model Table
 *     tags: [Bauer_Equipments_Model]
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
 *         description: The List Of The Bauer_Equipments_Model Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bauer_Equipments_Model'
 *   post:
 *     summary: Create New Bauer_Equipments_Model
 *     tags: [Bauer_Equipments_Model]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bauer_Equipments_Model'
 *     responses:
 *       200:
 *         description: The Created Bauer_Equipments_Model.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments_Model'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/Bauer_Equipments_Model/{ID}:
 *   get:
 *     summary: Get The Bauer_Equipments_Model Row by id
 *     tags: [Bauer_Equipments_Model]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Bauer_Equipments_Model id
 *     responses:
 *       200:
 *         description: The Bauer_Equipments_Model response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments_Model'
 *   put:
 *     summary: Update The Bauer_Equipments_Model by id
 *     tags: [Bauer_Equipments_Model]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The Bauer_Equipments_Model id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bauer_Equipments_Model'
 *     responses:
 *       200:
 *         description: The Bauer_Equipments_Model Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments_Model'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove Bauer_Equipments_Model Row by id
 *     tags: [Bauer_Equipments_Model]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Bauer_Equipments_Model id
 *     responses:
 *       200:
 *         description: The Bauer_Equipments_Model response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Bauer_Equipments_Model'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBauer_Equipments_Model} = require('../controllers/Bauer_Equipments_Model')
const {getBauer_Equipments_Model} = require('../controllers/Bauer_Equipments_Model')
const {addBauer_Equipments_Model} = require('../controllers/Bauer_Equipments_Model')
const {updateBauer_Equipments_Model} = require('../controllers/Bauer_Equipments_Model')
const {deleteBauer_Equipments_Model} = require('../controllers/Bauer_Equipments_Model')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBauer_Equipments_Model)

router.get('/:id', getBauer_Equipments_Model)

router.post('/', addBauer_Equipments_Model)

router.put('/:id', updateBauer_Equipments_Model)

router.delete('/:id', deleteBauer_Equipments_Model)

module.exports = router