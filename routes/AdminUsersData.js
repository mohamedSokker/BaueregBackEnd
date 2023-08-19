/**
 * @swagger
 * components:
 *   schemas:
 *    AdminUsersData:
 *      type: object
 *      required:
 *        - UserName
 *        - Password
 *        - PC_UserName
 *      properties:
 *        UserName:
 *          type: string
 *          description: UserName
 *        Password:
 *          type: string
 *          description: Password
 *        PC_UserName:
 *          type: string
 *          description: PC_UserName
 */

/**
 *  @swagger
 * tags:
 *   name: AdminUsersData
 *   description: AdminUsersData Table API
 * /api/v1/AdminUsersData:
 *   get:
 *     summary: List All AdminUsersData Table
 *     tags: [AdminUsersData]
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
 *         description: The List Of The AdminUsersData Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminUsersData'
 *   post:
 *     summary: Create New AdminUsersData
 *     tags: [AdminUsersData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUsersData'
 *     responses:
 *       200:
 *         description: The Created AdminUsersData.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersData'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/AdminUsersData/{ID}:
 *   get:
 *     summary: Get The AdminUsersData Row by id
 *     tags: [AdminUsersData]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminUsersData id
 *     responses:
 *       200:
 *         description: The AdminUsersData response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersData'
 *   put:
 *     summary: Update The AdminUsersData by id
 *     tags: [AdminUsersData]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The AdminUsersData id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUsersData'
 *     responses:
 *       200:
 *         description: The AdminUsersData Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersData'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove AdminUsersData Row by id
 *     tags: [AdminUsersData]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminUsersData id
 *     responses:
 *       200:
 *         description: The AdminUsersData response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersData'                   
 */

const express = require('express');
const router = express.Router();
const {getAllAdminUsersData} = require('../controllers/AdminUsersData')
const {getAdminUsersData} = require('../controllers/AdminUsersData')
const {addAdminUsersData} = require('../controllers/AdminUsersData')
const {updateAdminUsersData} = require('../controllers/AdminUsersData')
const {deleteAdminUsersData} = require('../controllers/AdminUsersData')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllAdminUsersData)

router.get('/:id', getAdminUsersData)

router.post('/', addAdminUsersData)

router.put('/:id', updateAdminUsersData)

router.delete('/:id', deleteAdminUsersData)

module.exports = router