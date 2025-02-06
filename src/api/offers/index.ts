import { actions } from "./controller.ts";
import { Router } from "express";
import { authenticate } from "../../services/auth/auth.ts";
import { UsersRoleEnum } from "../../utils/enum.ts";
import { validateBody } from "../../services/validator/body/index.ts";
import { offerSchema } from "./middlewares/index.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: API endpoints for managing offers
 */

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Retrieve a list of offers
 *     tags: [Offers]
 *     responses:
 *       200:
 *         description: A list of offers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Offer'
 */
router.get('/', authenticate(), actions.getAll);

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Retrieve a single offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The offer ID
 *     responses:
 *       200:
 *         description: A single offer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       404:
 *         description: Offer not found
 */
router.get('/:id', authenticate(), actions.getById);

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *     responses:
 *       201:
 *         description: The created offer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate(false, [UsersRoleEnum.ADMIN]), validateBody(offerSchema), actions.create);

/**
 * @swagger
 * /offers/{id}:
 *   put:
 *     summary: Update an existing offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The offer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *     responses:
 *       200:
 *         description: The updated offer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Offer not found
 */
router.put('/:id', authenticate(false, [UsersRoleEnum.ADMIN]), actions.update);

/**
 * @swagger
 * /offers/{id}:
 *   delete:
 *     summary: Permanently delete an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The offer ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Offer not found
 */
router.delete('/:id', authenticate(false, [UsersRoleEnum.ADMIN]), actions.deletePermanently);

export default router;