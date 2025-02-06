import { actions } from "./controller.ts";
import { Router } from "express";
import { authenticate } from "../../services/auth/auth.ts";
import { UsersRoleEnum } from "../../utils/enum.ts";
import { validateBody } from "../../services/validator/body/index.ts";
import { reservationSchema } from "./middlewares/index.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API endpoints for managing reservations
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Retrieve a list of reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get('/', authenticate(), actions.getAll);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Retrieve a single reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: A single reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */
router.get('/:id', authenticate(), actions.getById);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: The created reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate(false, [UsersRoleEnum.ADMIN]), validateBody(reservationSchema), actions.create);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Update an existing reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: The updated reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Reservation not found
 */
router.put('/:id', authenticate(false, [UsersRoleEnum.ADMIN]), actions.update);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Permanently delete a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Reservation not found
 */
router.delete('/:id', authenticate(false, [UsersRoleEnum.ADMIN]), actions.deletePermanently);

export default router;