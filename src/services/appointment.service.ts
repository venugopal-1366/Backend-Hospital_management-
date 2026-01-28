import { pool } from "../config/db";
import { APPOINTMENT_STATUS } from "../constants/appointmentStatus";

export const getAppointmentById = async (id: number) => {
  const { rows } = await pool.query(
    "SELECT * FROM appointments WHERE id=$1",
    [id]
  );
  return rows[0];
};

export const createAppointment = async (data: any) => {
  const { rows } = await pool.query(
    `INSERT INTO appointments(doctor_id, patient_id, appointment_date, status)
     VALUES($1,$2,$3,'BOOKED') RETURNING *`,
    [data.doctorId, data.patientId, data.date]
  );
  return rows[0];
};

export const updateAppointment = async (id: number, data: any) => {
  const { rows } = await pool.query(
    `UPDATE appointments
     SET appointment_date=$1, status=$2
     WHERE id=$3 RETURNING *`,
    [data.date, data.status, id]
  );
  return rows[0];
};

export const deleteAppointment = async (id: number) => {
  await pool.query("DELETE FROM appointments WHERE id=$1", [id]);
};
