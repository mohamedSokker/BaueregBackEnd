/**
 * @swagger
 * components:
 *   schemas:
 *    BC2000:
 *      type: object
 *      required:
 *        - DateTime
 *        - Location
 *        - Equipment
 *        - HydraulicSystem_ChangeTankReturnFilter
 *        - HydraulicSystem_ChangePilotFilter
 *        - HydraulicSystem_ChangeVentilationFilter
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
 *        HydraulicSystem_ChangeTankReturnFilter:
 *          type: string
 *          description: HydraulicSystem_ChangeTankReturnFilter
 *        HydraulicSystem_ChangePilotFilter:
 *          type: string
 *          description: HydraulicSystem_ChangePilotFilter
 *        HydraulicSystem_ChangeVentilationFilter:
 *          type: string
 *          description: HydraulicSystem_ChangeVentilationFilter
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
 *   name: BC2000
 *   description: BC2000 Table API
 * /api/v1/BC2000:
 *   get:
 *     summary: List All BC2000 Table
 *     tags: [BC2000]
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
 *         description: The List Of The BC2000 Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BC2000'
 *   post:
 *     summary: Create New BC2000
 *     tags: [BC2000]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BC2000'
 *     responses:
 *       200:
 *         description: The Created BC2000.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BC2000'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/BC2000/{ID}:
 *   get:
 *     summary: Get The BC2000 Row by id
 *     tags: [BC2000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BC2000 id
 *     responses:
 *       200:
 *         description: The BC2000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BC2000'
 *   put:
 *     summary: Update The BC2000 by id
 *     tags: [BC2000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The BC2000 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BC2000'
 *     responses:
 *       200:
 *         description: The BC2000 Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BC2000'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove BC2000 Row by id
 *     tags: [BC2000]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The BC2000 id
 *     responses:
 *       200:
 *         description: The BC2000 response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/BC2000'                   
 */

const express = require('express');
const router = express.Router();
const {getAllBC2000} = require('../controllers/BC2000')
const {getBC2000} = require('../controllers/BC2000')
const {addBC2000} = require('../controllers/BC2000')
const {updateBC2000} = require('../controllers/BC2000')
const {deleteBC2000} = require('../controllers/BC2000')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllBC2000)

router.get('/:id', getBC2000)

router.post('/', addBC2000)

router.put('/:id', updateBC2000)

router.delete('/:id', deleteBC2000)

module.exports = router