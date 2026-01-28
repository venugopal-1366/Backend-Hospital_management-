import { Router } from "express";
import {
  create,
  getByAppointment,
  update,
  remove,
} from "../controllers/prescription.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createPrescriptionSchema,
  updatePrescriptionSchema,
} from "../schema/prescription.schema";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Prescriptions
 *   description: Prescription management APIs
 */

/**
 * @swagger
 * /api/prescriptions:
 *   post:
 *     summary: Create prescription (Doctor only)
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *               - medicines
 *             properties:
 *               appointmentId:
 *                 type: integer
 *                 example: 1
 *               medicines:
 *                 type: string
 *                 example: Paracetamol 500mg, Vitamin C
 *               notes:
 *                 type: string
 *                 example: Take after food
 *     responses:
 *       201:
 *         description: Prescription created
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  create
);

/**
 * @swagger
 * /api/prescriptions/{appointmentId}:
 *   get:
 *     summary: Get prescriptions by appointment
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prescription list
 */
router.get(
  "/:appointmentId",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getByAppointment
);

/**
 * @swagger
 * /api/prescriptions/{id}:
 *   put:
 *     summary: Update prescription
 *     tags: [Prescriptions]
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
 *               medicines:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prescription updated
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  update
);

/**
 * @swagger
 * /api/prescriptions/{id}:
 *   delete:
 *     summary: Delete prescription
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Prescription deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  remove
);

export default router;
