import { z } from "zod";

export const createPrescriptionSchema = z.object({
  appointmentId: z.number().int().positive(),
  medicines: z.string().min(3),
  notes: z.string().optional(),
});

export const updatePrescriptionSchema = z.object({
  medicines: z.string().min(3).optional(),
  notes: z.string().optional(),
});
