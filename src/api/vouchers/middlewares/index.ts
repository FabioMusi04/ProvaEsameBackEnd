import { z } from 'zod';

export const voucherSchema = z.object({
  name: z.string(),
  description: z.string(),
  basePricePerNightPerPerson: z.number(),
  availableMonths: z.array(z.string()),
  locations: z.array(z.string()),
  maxPeople: z.number(),
  expiredAt: z.date().optional(),
});