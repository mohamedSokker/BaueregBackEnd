/**
 * @swagger
 * components:
 *   schemas:
 *    Availability:
 *      type: object
 *      required:
 *        - Date_Time
 *        - Equipment
 *        - Location
 *        - Periodic_Maintenance
 *        - Breakdown_Time
 *        - Available_Time
 *        - Maintenance_Availability
 *        - Site_QC_Time
 *        - Site_Availability
 *        - Maintenance_ID
 *      properties:
 *        Date_Time:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02 13:10:00'
 *          description: Date_Time
 *        Equipment:
 *          type: string
 *          description: Equipment
 *        Location:
 *          type: string
 *          description: Location
 *        Periodic_Maintenance:
 *          type: string
 *          description: Periodic_Maintenance
 *        Breakdown_Time:
 *          type: string
 *          description: Breakdown_Time
 *        Available_Time:
 *          type: string
 *          description: Available_Time
 *        Maintenance_Availability:
 *          type: string
 *          description: Maintenance_Availability
 *        Site_QC_Time:
 *          type: string
 *          description: Site_QC_Time
 *        Site_Availability:
 *          type: string
 *          description: Site_Availability
 *        Maintenance_ID:
 *          type: string
 *          description: Equipment
 */

/**
 *  @swagger
 * tags:
 *   name: Availability
 *   description: Availability Table API
 * /api/v1/Availability:
 *   get:
 *     summary: List All Availability Table
 *     tags: [Availability]
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
 *         description: The List Of The Availability Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Availability'
 *   post:
 *     summary: Create New Availability
 *     tags: [Availability]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Availability'
 *     responses:
 *       200:
 *         description: The Created Availability.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/Availability/{ID}:
 *   get:
 *     summary: Get The Availability Row by id
 *     tags: [Availability]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Availability id
 *     responses:
 *       200:
 *         description: The Availability response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'
 *   put:
 *     summary: Update The Availability by id
 *     tags: [Availability]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The Availability id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Availability'
 *     responses:
 *       200:
 *         description: The Availability Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove Availability Row by id
 *     tags: [Availability]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Availability id
 *     responses:
 *       200:
 *         description: The Availability response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'                   
 */

const express = require('express');
const router = express.Router();
const {getAllAvailability} = require('../controllers/Availability')
const {getAvailability} = require('../controllers/Availability')
const {addAvailability} = require('../controllers/Availability')
const {updateAvailability} = require('../controllers/Availability')
const {deleteAvailability} = require('../controllers/Availability')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllAvailability)

router.get('/:id', getAvailability)

router.post('/', addAvailability)

router.put('/:id', updateAvailability)

router.delete('/:id', deleteAvailability)

module.exports = router