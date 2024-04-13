/**
 * @swagger
 * components:
 *   schemas:
 *    Test:
 *      type: object
 *      required:
 *        - Data1
 *        - Data2
 *      properties:
 *        Data1:
 *          type: string
 *          description: data1
 *        Data2:
 *          type: string
 *          description: data2
 */

/**
 *  @swagger
 * tags:
 *   name: Test
 *   description: Test Table API
 * /api/v1/Test:
 *   get:
 *     summary: List All Test Table
 *     tags: [Test]
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
 *           example: "SELECT * FROM Test WHERE Location= 'Banha'"
 *     responses:
 *       200:
 *         description: The List Of The Test Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 *   post:
 *     summary: Create New Test
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *     responses:
 *       200:
 *         description: The Created Test.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/Test/{ID}:
 *   get:
 *     summary: Get The Test Row by id
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Test id
 *     responses:
 *       200:
 *         description: The Test response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *   put:
 *     summary: Update The Test by id
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The Test id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *     responses:
 *       200:
 *         description: The Test Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove Test Row by id
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The Test id
 *     responses:
 *       200:
 *         description: The Test response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'                   
 */

const express = require('express');
const router = express.Router();
const {getAllTest} = require('../controllers/Test')
const {getTest} = require('../controllers/Test')
const {addTest} = require('../controllers/Test')
const {updateTest} = require('../controllers/Test')
const {deleteTest} = require('../controllers/Test')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllTest)

router.get('/:id', getTest)

router.post('/', addTest)

router.put('/:id', updateTest)

router.delete('/:id', deleteTest)

module.exports = router