import { z } from 'zod';

export const offerSchema = z.object({
  voucherId: z.string().uuid(),
  month: z.string(),
  discountPercentage: z.number(),
  minNights: z.number(),
  minPeople: z.number(),
  finalPricePerNightPerPerson: z.number(),
});