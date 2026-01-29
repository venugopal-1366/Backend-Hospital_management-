import { pool } from "../config/db";

export const createPatient = async (data: any) => {
  const { rows } = await pool.query(
    `INSERT INTO patients (user_id, age, gender)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.userId, data.age, data.gender]
  );
  return rows[0];
};

export const getAllPatients = async () => {
  const { rows } = await pool.query(
    `SELECT p.*, u.name, u.email
     FROM patients p
     JOIN users u ON p.user_id = u.id`
  );
  return rows;
};

export const getPatientById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT p.*, u.name, u.email
     FROM patients p
     JOIN users u ON p.user_id = u.id
     WHERE p.patient_id = $1`,
    [id]
  );
  return rows[0];
};

export const updatePatient = async (id: number, data: any) => {
  const { rows } = await pool.query(
    `UPDATE patients
     SET age = $1,
         gender = $2
     WHERE patient_id = $3
     RETURNING *`,
    [data.age, data.gender, id]
  );
  return rows[0];
};

export const deletePatient = async (id: number) => {
  await pool.query("DELETE FROM patients WHERE patient_id = $1", [id]);
};
