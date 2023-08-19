/**
 * @swagger
 * components:
 *   schemas:
 *    AdminUsers:
 *      type: object
 *      required:
 *        - Username
 *        - Password
 *        - Email
 *        - Role
 *        - Permession
 *        - profile
 *        - cover
 *      properties:
 *        Username:
 *          type: string
 *          description: Username
 *        Password:
 *          type: string
 *          description: Password
 *        Email:
 *          type: string
 *          description: Email
 *        Role:
 *          type: string
 *          description: Role
 *        Permession:
 *          type: string
 *          description: Permession
 *        profile:
 *          type: string
 *          description: profile
 *        cover:
 *          type: string
 *          description: cover
 */

/**
 *  @swagger
 * tags:
 *   name: AdminUsers
 *   description: AdminUsers Table API
 * /api/v1/AdminUsers:
 *   get:
 *     summary: List All AdminUsers Table
 *     tags: [AdminUsers]
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
 *         description: The List Of The AdminUsers Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminUsers'
 *   post:
 *     summary: Create New AdminUsers
 *     tags: [AdminUsers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUsers'
 *     responses:
 *       200:
 *         description: The Created AdminUsers.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsers'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/AdminUsers/{UserID}:
 *   get:
 *     summary: Get The AdminUsers Row by id
 *     tags: [AdminUsers]
 *     parameters:
 *       - in: path
 *         name: UserID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminUsers id
 *     responses:
 *       200:
 *         description: The AdminUsers response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsers'
 *   put:
 *     summary: Update The AdminUsers by id
 *     tags: [AdminUsers]
 *     parameters:
 *       - in: path
 *         name: UserID
 *         schema:
 *           type: string
 *           required: true
 *           description: The AdminUsers id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUsers'
 *     responses:
 *       200:
 *         description: The AdminUsers Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsers'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove AdminUsers Row by id
 *     tags: [AdminUsers]
 *     parameters:
 *       - in: path
 *         name: UserID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminUsers id
 *     responses:
 *       200:
 *         description: The AdminUsers response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsers'                   
 */

const express = require('express');
const router = express.Router();
const {getAllAdminUsers} = require('../controllers/AdminUsers')
const {getAdminUsers} = require('../controllers/AdminUsers')
const {addAdminUsers} = require('../controllers/AdminUsers')
const {updateAdminUsers} = require('../controllers/AdminUsers')
const {deleteAdminUsers} = require('../controllers/AdminUsers')

// router.use((req,res,next) => {
//     console.log('middleware')
//     next()
// })

router.get('/', getAllAdminUsers)

router.get('/:id', getAdminUsers)

router.post('/', addAdminUsers)

router.put('/:id', updateAdminUsers)

router.delete('/:id', deleteAdminUsers)

module.exports = router