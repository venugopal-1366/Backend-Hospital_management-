import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { registerSchema, loginSchema } from "../schema/auth.schema";


const router = Router();
router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Authorization APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Venu
 *               email:
 *                 type: string
 *                 example: venu@gmail.com
 *               password:
 *                 type: string
 *                 example: venu@123
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: venu@gmail.com
 *               password:
 *                 type: string
 *                 example: venu@123
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

export default router;
