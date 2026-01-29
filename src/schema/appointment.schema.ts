import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctorId: z.coerce.number().int().positive(),
  patientId: z.coerce.number().int().positive(),
  date: z.string().min(1),
});

export const updateAppointmentSchema = z.object({
  date: z.string().min(1).optional(),
  status: z.enum(["BOOKED", "COMPLETED", "CANCELLED"]).optional(),
});
