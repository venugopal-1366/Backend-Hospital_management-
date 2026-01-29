import { pool } from "../config/db";

export const createPrescription = async (data: any) => {
  const { rows } = await pool.query(
    `INSERT INTO prescriptions (appointment_id, medicines, notes)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.appointmentId, data.medicines, data.notes]
  );
  return rows[0];
};

export const getPrescriptionsByAppointment = async (
  appointmentId: number
) => {
  const { rows } = await pool.query(
    `SELECT * FROM prescriptions WHERE appointment_id = $1`,
    [appointmentId]
  );
  return rows;
};

export const getAllPrescriptions = async () => {
  const { rows } = await pool.query("SELECT * FROM prescriptions");
  return rows;
};


export const updatePrescription = async (id: number, data: any) => {
  const { rows } = await pool.query(
    `UPDATE prescriptions
     SET medicines = $1,
         notes = $2
     WHERE prescription_id = $3
     RETURNING *`,
    [data.medicines, data.notes, id]
  );
  return rows[0];
};

export const deletePrescription = async (id: number) => {
  await pool.query("DELETE FROM prescriptions WHERE prescription_id = $1", [id]);
};
