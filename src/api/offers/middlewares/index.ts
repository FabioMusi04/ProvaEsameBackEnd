import { Types } from 'mongoose';
import { z } from 'zod';

export const offerSchema = z.object({
  voucherId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  month: z.string(),
  discountPercentage: z.number(),
  minNights: z.number(),
  minPeople: z.number(),
  finalPricePerNightPerPerson: z.number(),
});