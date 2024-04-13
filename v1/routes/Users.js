/**
* @swagger
* components:
*   schemas:
*    Users:
*      type: object
*      required:
*        - Locations
*        - LastTimePeriodicMaint
*        - UserName
*        - Password
*      properties:
*        Locations:
*          type: string
*          description: Locations
*        LastTimePeriodicMaint:
*          type: string
*          format: date-time
*          example: '2022-01-02 13:02:00'
*          description: LastTimePeriodicMaint
*        UserName:
*          type: string
*          description: UserName
*        Password:
*          type: string
*          description: Password
*/

/**
*  @swagger
* tags:
*   name: Users
*   description: Users Table API
* /api/v1/Users:
*   get:
*     summary: List All Users Table
*     tags: [Users]
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
*           example: "SELECT * FROM Users WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Users Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Users'
*   post:
*     summary: Create New Users
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Users'
*     responses:
*       200:
*         description: The Created Users.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Users'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Users/{ID}:
*   get:
*     summary: Get The Users Row by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Users id
*     responses:
*       200:
*         description: The Users response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Users'
*   put:
*     summary: Update The Users by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Users id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Users'
*     responses:
*       200:
*         description: The Users Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Users'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Users Row by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Users id
*     responses:
*       200:
*         description: The Users response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Users'
*/

const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/Users')
const {getUsers} = require('../controllers/Users')
const {addUsers} = require('../controllers/Users')
const {updateUsers} = require('../controllers/Users')
const {deleteUsers} = require('../controllers/Users')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllUsers)

router.get('/:id', getUsers)

router.post('/', addUsers)

router.put('/:id', updateUsers)

router.delete('/:id', deleteUsers)

module.exports = router