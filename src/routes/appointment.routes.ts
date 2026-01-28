import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/appointment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../schema/appointment.schema";

const router = Router();
router.post("/", authMiddleware, roleMiddleware("PATIENT"), validate(createAppointmentSchema), create);
router.put("/:id", authMiddleware, roleMiddleware("DOCTOR", "ADMIN"), validate(updateAppointmentSchema), update);
/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management APIs
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 */
router.get("/", authMiddleware, getAll);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
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
 *         description: Appointment details
 */
router.get("/:id", authMiddleware, getById);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - patientId
 *               - date
 *             properties:
 *               doctorId:
 *                 type: integer
 *               patientId:
 *                 type: integer
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("PATIENT"),
  create
);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointments]
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
 *               date:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR", "ADMIN"),
  update
);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Appointment deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  remove
);

export default router;
