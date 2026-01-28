export const ROLES = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
  RECEPTIONIST: "RECEPTIONIST",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
