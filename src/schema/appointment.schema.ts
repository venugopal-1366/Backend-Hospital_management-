import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctorId: z.number().int().positive(),
  patientId: z.number().int().positive(),
  date: z.string().datetime(),
});

export const updateAppointmentSchema = z.object({
  date: z.string().datetime().optional(),
  status: z.enum(["BOOKED", "COMPLETED", "CANCELLED"]).optional(),
});
