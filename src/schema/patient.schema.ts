import { z } from "zod";

export const createPatientSchema = z.object({
  userId: z.number().int().positive(),
  age: z.number().int().min(0),
  gender: z.enum(["Male", "Female", "Other"]),
});

export const updatePatientSchema = z.object({
  age: z.number().int().min(0).optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
});
