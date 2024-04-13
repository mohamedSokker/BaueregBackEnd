/**
 * @swagger
 * components:
 *   schemas:
 *    Constants:
 *      type: object
 *      required:
 *        - Location
 *        - Activitys
 *        - Value
 *        - StartDate
 *        - EndDate
 *      properties:
 *        Location:
 *          type: string
 *          description: Location
 *        Activitys:
 *          type: string
 *          description: Activitys
 *        Value:
 *          type: number
 *          example: 1.2
 *          description: Value
 *        StartDate:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02'
 *          description: StartDate
 *        EndDate:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02'
 *          description: EndDate
 */

/**
 *  @swagger
 * tags:
 *   name: Constants
 *   description: Constants Table API
 * /api/v1/Constants:
 *   get:
 *     summary: List All Constants Table
 *     tags: [Constants]
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
 *           example: "SELECT * FROM Constants WHERE Location= 'Banha'"
 *     responses:
 *       200:
 *         description: The List Of The Constants Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Constants'
 *   post:
 *     summary: Create New Constants
 *     tags: [Constants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Constants'
 *     responses:
 *       200:
 *         description: The Created Constants.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Constants'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/Constants/{ID}:
 *   get:
 *     summary: Get The Constants Row by id
 *     tags: [Constants]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Constants id
 *     responses:
 *       200:
 *         description: The Constants response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Constants'
 *   put:
 *     summary: Update The Constants by id
 *     tags: [Constants]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The Constants id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Constants'
 *     responses:
 *       200:
 *         description: The Constants Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Constants'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove Constants Row by id
 *     tags: [Constants]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Constants id
 *     responses:
 *       200:
 *         description: The Constants response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Constants'                   
 */

const express = require('express');
const router = express.Router();
const {getAllConstants} = require('../controllers/Constants')
const {getConstants} = require('../controllers/Constants')
const {addConstants} = require('../controllers/Constants')
const {updateConstants} = require('../controllers/Constants')
const {deleteConstants} = require('../controllers/Constants')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllConstants)

router.get('/:id', getConstants)

router.post('/', addConstants)

router.put('/:id', updateConstants)

router.delete('/:id', deleteConstants)

module.exports = router