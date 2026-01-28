export const APPOINTMENT_STATUS = {
  BOOKED: "BOOKED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type AppointmentStatus =
  typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS];
