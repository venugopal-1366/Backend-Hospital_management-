import { Router } from "express";
import { create, getAll, getById, update, remove } from "../controllers/doctor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createDoctorSchema,
  updateDoctorSchema,
} from "../schema/doctor.schema";


const router = Router();
router.post("/", authMiddleware, roleMiddleware("ADMIN"), validate(createDoctorSchema), create);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), validate(updateDoctorSchema), update);

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management APIs
 */

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create doctor
 *     tags: [Doctors]
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
 *               - specialization
 *               - experience
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               specialization:
 *                 type: string
 *                 example: Cardiology
 *               experience:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Doctor created
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  create
);

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get("/", authMiddleware, getAll);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
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
 *         description: Doctor details
 */
router.get("/:id", authMiddleware, getById);

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update doctor
 *     tags: [Doctors]
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
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Doctor updated
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  update
);

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Doctor deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  remove
);

export default router;
