import { actions } from "./controller.ts";
import { Router } from "express";
import { authenticate } from "../../services/auth/auth.ts";
import { UsersRoleEnum } from "../../utils/enum.ts";
import { validateBody } from "../../services/validator/body/index.ts";
import { voucherSchema } from "./middlewares/index.ts";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: API endpoints for managing vouchers
 */

/**
 * @swagger
 * /vouchers:
 *   get:
 *     summary: Retrieve a list of vouchers
 *     tags: [Vouchers]
 *     responses:
 *       200:
 *         description: A list of vouchers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voucher'
 */
router.get('/', authenticate(), actions.getAll);

/**
 * @swagger
 * /vouchers/{id}:
 *   get:
 *     summary: Retrieve a single voucher by ID
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The voucher ID
 *     responses:
 *       200:
 *         description: A single voucher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       404:
 *         description: Voucher not found
 */
router.get('/:id', authenticate(), actions.getById);

/**
 * @swagger
 * /vouchers:
 *   post:
 *     summary: Create a new voucher
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voucher'
 *     responses:
 *       201:
 *         description: The created voucher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate(false, [UsersRoleEnum.ADMIN]), validateBody(voucherSchema), actions.create);

/**
 * @swagger
 * /vouchers/{id}:
 *   put:
 *     summary: Update an existing voucher
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The voucher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voucher'
 *     responses:
 *       200:
 *         description: The updated voucher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Voucher not found
 */
router.put('/:id', authenticate(false, [UsersRoleEnum.ADMIN]), actions.update);

/**
 * @swagger
 * /vouchers/{id}:
 *   delete:
 *     summary: Permanently delete a voucher
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The voucher ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Voucher not found
 */
router.delete('/:id', authenticate(false, [UsersRoleEnum.ADMIN]), actions.deletePermanently);

export default router;