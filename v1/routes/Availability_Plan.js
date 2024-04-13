/**
 * @swagger
 * components:
 *   schemas:
 *    Availability_Plan:
 *      type: object
 *      required:
 *        - Location
 *        - DateFrom
 *        - DateTo
 *        - Friday
 *        - Saturday
 *        - Sunday
 *        - Monday
 *        - Tuesday
 *        - Wednesday
 *        - Thursday
 *      properties:
 *        Location:
 *          type: string
 *          description: Location
 *        DateFrom:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02 13:10:00'
 *          description: DateFrom
 *        DateTo:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02 13:10:00'
 *          description: DateTo
 *        Friday:
 *          type: integer
 *          format: int32
 *          description: Friday
 *        Saturday:
 *          type: integer
 *          format: int32
 *          description: Saturday
 *        Sunday:
 *          type: integer
 *          format: int32
 *          description: Sunday
 *        Monday:
 *          type: integer
 *          format: int32
 *          description: Monday
 *        Tuesday:
 *          type: integer
 *          format: int32
 *          description: Tuesday
 *        Wednesday:
 *          type: integer
 *          format: int32
 *          description: Wednesday
 *        Thursday:
 *          type: integer
 *          format: int32
 *          description: Thursday
 */

/**
 *  @swagger
 * tags:
 *   name: Availability_Plan
 *   description: Availability_Plan Table API
 * /api/v1/Availability_Plan:
 *   get:
 *     summary: List All Availability_Plan Table
 *     tags: [Availability_Plan]
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
 *         description: The List Of The Availability_Plan Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Availability_Plan'
 *   post:
 *     summary: Create New Availability_Plan
 *     tags: [Availability_Plan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Availability_Plan'
 *     responses:
 *       200:
 *         description: The Created Availability_Plan.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability_Plan'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/Availability_Plan/{ID}:
 *   get:
 *     summary: Get The Availability_Plan Row by id
 *     tags: [Availability_Plan]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Availability_Plan id
 *     responses:
 *       200:
 *         description: The Availability_Plan response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability_Plan'
 *   put:
 *     summary: Update The Availability_Plan by id
 *     tags: [Availability_Plan]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The Availability_Plan id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Availability_Plan'
 *     responses:
 *       200:
 *         description: The Availability_Plan Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability_Plan'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove Availability_Plan Row by id
 *     tags: [Availability_Plan]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Availability_Plan id
 *     responses:
 *       200:
 *         description: The Availability_Plan response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability_Plan'                   
 */

const express = require('express');
const router = express.Router();
const {getAllAvailability_Plan} = require('../controllers/Availability_Plan')
const {getAvailability_Plan} = require('../controllers/Availability_Plan')
const {addAvailability_Plan} = require('../controllers/Availability_Plan')
const {updateAvailability_Plan} = require('../controllers/Availability_Plan')
const {deleteAvailability_Plan} = require('../controllers/Availability_Plan')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllAvailability_Plan)

router.get('/:id', getAvailability_Plan)

router.post('/', addAvailability_Plan)

router.put('/:id', updateAvailability_Plan)

router.delete('/:id', deleteAvailability_Plan)

module.exports = router