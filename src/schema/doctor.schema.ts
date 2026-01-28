import { z } from "zod";

export const createDoctorSchema = z.object({
  userId: z.number().int().positive(),
  specialization: z.string().min(2),
  experience: z.number().int().min(0),
});

export const updateDoctorSchema = z.object({
  specialization: z.string().min(2).optional(),
  experience: z.number().int().min(0).optional(),
});
