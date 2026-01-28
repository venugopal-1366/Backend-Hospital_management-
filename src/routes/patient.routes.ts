import { Router } from "express";
import { create, getAll, getById, update, remove } from "../controllers/patient.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createPatientSchema,
  updatePatientSchema }
from "../schema/patient.schema";

const router = Router();
router.post("/", authMiddleware, roleMiddleware("ADMIN"), validate(createPatientSchema), create);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), validate(updatePatientSchema), update);


/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management APIs
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - age
 *               - gender
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 3
 *               age:
 *                 type: integer
 *                 example: 30
 *               gender:
 *                 type: string
 *                 example: Male
 *     responses:
 *       201:
 *         description: Patient created
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  create
);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  getAll
);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient details
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  getById
);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  update
);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Patient deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  remove
);

export default router;
