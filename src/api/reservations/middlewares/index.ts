import { z } from 'zod';
import { ReservationStatusValues } from '../../../utils/enum.ts';
import { Types } from 'mongoose';

export const reservationSchema = z.object({
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  voucherId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  peopleCount: z.number().int().positive(),
  nights: z.number().int().positive(),
  month: z.string(),
  totalPrice: z.number().positive(),
  status: z.enum(Object.values(ReservationStatusValues) as [string, ...string[]]).optional(),
});