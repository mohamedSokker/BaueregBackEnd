/**
* @swagger
* components:
*   schemas:
*    Employees:
*      type: object
*      required:
*        - Birth_Date
*        - Working_Date
*        - Code
*        - Name
*        - Job
*        - Work Nature
*        - Location
*        - Educational_Qualification
*        - Succed_In_TrainingCourse
*        - National_ID
*        - Telephone_1
*        - Telephone_2
*      properties:
*        Birth_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Birth_Date
*        Working_Date:
*          type: string
*          format: date-time
*          example: '2022-01-02'
*          description: Working_Date
*        Code:
*          type: string
*          description: Code
*        Name:
*          type: string
*          description: Name
*        Job:
*          type: string
*          description: Job
*        Work Nature:
*          type: string
*          description: Work Nature
*        Location:
*          type: string
*          description: Location
*        Educational_Qualification:
*          type: string
*          description: Educational_Qualification
*        Succed_In_TrainingCourse:
*          type: string
*          description: Succed_In_TrainingCourse
*        National_ID:
*          type: string
*          description: National_ID
*        Telephone_1:
*          type: string
*          description: Telephone_1
*        Telephone_2:
*          type: string
*          description: Telephone_2
*/

/**
*  @swagger
* tags:
*   name: Employees
*   description: Employees Table API
* /api/v1/Employees:
*   get:
*     summary: List All Employees Table
*     tags: [Employees]
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
*           example: "SELECT * FROM Employees WHERE Location= 'Banha'"
*     responses:
*       200:
*         description: The List Of The Employees Table
*         content:
*           applicattion/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Employees'
*   post:
*     summary: Create New Employees
*     tags: [Employees]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Employees'
*     responses:
*       200:
*         description: The Created Employees.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Employees'
*       404:
*         description: Wrong Arguments Or not Found
* /api/v1/Employees/{ID}:
*   get:
*     summary: Get The Employees Row by id
*     tags: [Employees]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Employees id
*     responses:
*       200:
*         description: The Employees response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Employees'
*   put:
*     summary: Update The Employees by id
*     tags: [Employees]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*           required: true
*           description: The Employees id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Employees'
*     responses:
*       200:
*         description: The Employees Row Was Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Employees'
*       404:
*         description: Wrong Arguments Or not found
*   delete:
*     summary: Remove Employees Row by id
*     tags: [Employees]
*     parameters:
*       - in: path
*         name: ID
*         schema:
*           type: string
*         required: true
*         description: The Employees id
*     responses:
*       200:
*         description: The Employees response by id
*         content:
*           apllication/json:
*             schema:
*               $ref: '#/components/schemas/Employees'
*/

const express = require('express');
const router = express.Router();
const {getAllEmployees} = require('../controllers/Employees')
const {getEmployees} = require('../controllers/Employees')
const {addEmployees} = require('../controllers/Employees')
const {updateEmployees} = require('../controllers/Employees')
const {deleteEmployees} = require('../controllers/Employees')

router.use((req,res,next) => {
    console.log('middleware')
    next()
})

router.get('/', getAllEmployees)

router.get('/:id', getEmployees)

router.post('/', addEmployees)

router.put('/:id', updateEmployees)

router.delete('/:id', deleteEmployees)

module.exports = router