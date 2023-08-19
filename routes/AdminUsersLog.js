/**
 * @swagger
 * components:
 *   schemas:
 *    AdminUsersLog:
 *      type: object
 *      required:
 *        - DateTime
 *        - UserName
 *        - PC_UserName
 *        - Action
 *      properties:
 *        DateTime:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02 13:10:00'
 *          description: DateTime
 *        UserName:
 *          type: string
 *          description: UserName
 *        PC_UserName:
 *          type: string
 *          description: PC_UserName
 *        Action:
 *          type: string
 *          description: Action
 */

/**
 *  @swagger
 * tags:
 *   name: AdminUsersLog
 *   description: AdminUsersLog Table API
 * /api/v1/AdminUsersLog:
 *   get:
 *     summary: List All AdminUsersLog Table
 *     tags: [AdminUsersLog]
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
 *         description: The List Of The AdminUsersLog Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminUsersLog'
 *   post:
 *     summary: Create New AdminUsersLog
 *     tags: [AdminUsersLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUsersLog'
 *     responses:
 *       200:
 *         description: The Created AdminUsersLog.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersLog'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/AdminUsersLog/{ID}:
 *   get:
 *     summary: Get The AdminUsersLog Row by id
 *     tags: [AdminUsersLog]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminUsersLog id
 *     responses:
 *       200:
 *         description: The AdminUsersLog response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersLog'
 *   put:
 *     summary: Update The AdminUsersLog by id
 *     tags: [AdminUsersLog]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The AdminUsersLog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUsersLog'
 *     responses:
 *       200:
 *         description: The AdminUsersLog Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersLog'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove AdminUsersLog Row by id
 *     tags: [AdminUsersLog]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminUsersLog id
 *     responses:
 *       200:
 *         description: The AdminUsersLog response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersLog'                   
 */

const express = require('express');
const router = express.Router();
const {getAllAdminUsersLog} = require('../controllers/AdminUsersLog')
const {getAdminUsersLog} = require('../controllers/AdminUsersLog')
const {addAdminUsersLog} = require('../controllers/AdminUsersLog')
const {updateAdminUsersLog} = require('../controllers/AdminUsersLog')
const {deleteAdminUsersLog} = require('../controllers/AdminUsersLog')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllAdminUsersLog)

router.get('/:id', getAdminUsersLog)

router.post('/', addAdminUsersLog)

router.put('/:id', updateAdminUsersLog)

router.delete('/:id', deleteAdminUsersLog)

module.exports = router