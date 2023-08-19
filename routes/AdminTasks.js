/**
 * @swagger
 * components:
 *   schemas:
 *    AdminTasks:
 *      type: object
 *      required:
 *        - Summary
 *        - DateCreated
 *        - Title
 *        - Status
 *      properties:
 *        Summary:
 *          type: string
 *          description: Summary
 *        DateCreated:
 *          type: string
 *          format: date-time
 *          example: '2022-01-02 13:02:00'
 *          description: DateCreated
 *        Title:
 *          type: string
 *          description: Title
 *        Status:
 *          type: string
 *          description: Status
 */

/**
 *  @swagger
 * tags:
 *   name: AdminTasks
 *   description: AdminTasks Table API
 * /api/v1/AdminTasks:
 *   get:
 *     summary: List All AdminTasks Table
 *     tags: [AdminTasks]
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
 *           example: "SELECT * FROM AdminTasks WHERE Location= 'Banha'"
 *     responses:
 *       200:
 *         description: The List Of The AdminTasks Table
 *         content:
 *           applicattion/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminTasks'
 *   post:
 *     summary: Create New AdminTasks
 *     tags: [AdminTasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminTasks'
 *     responses:
 *       200:
 *         description: The Created AdminTasks.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminTasks'
 *       404:
 *         description: Wrong Arguments Or not Found
 * /api/v1/AdminTasks/{ID}:
 *   get:
 *     summary: Get The AdminTasks Row by id
 *     tags: [AdminTasks]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminTasks id
 *     responses:
 *       200:
 *         description: The AdminTasks response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminTasks'
 *   put:
 *     summary: Update The AdminTasks by id
 *     tags: [AdminTasks]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *           required: true
 *           description: The AdminTasks id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminTasks'
 *     responses:
 *       200:
 *         description: The AdminTasks Row Was Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminTasks'
 *       404:
 *         description: Wrong Arguments Or not found
 *   delete:
 *     summary: Remove AdminTasks Row by id
 *     tags: [AdminTasks]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The AdminTasks id
 *     responses:
 *       200:
 *         description: The AdminTasks response by id
 *         content:
 *           apllication/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminTasks'
 */

const express = require("express");
const router = express.Router();
const { getAllAdminTasks } = require("../controllers/AdminTasks");
const { getAdminTasks } = require("../controllers/AdminTasks");
const { addAdminTasks } = require("../controllers/AdminTasks");
const { updateAdminTasks } = require("../controllers/AdminTasks");
const { deleteAdminTasks } = require("../controllers/AdminTasks");

// router.use((req,res,next) => {
//     console.log('middleware')
//     next()
// })

router.get("/", getAllAdminTasks);

router.get("/:id", getAdminTasks);

router.post("/", addAdminTasks);

router.put("/:id", updateAdminTasks);

router.delete("/:id", deleteAdminTasks);

module.exports = router;
