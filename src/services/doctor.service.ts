import { pool } from "../config/db";

export const createDoctor = async (data: any) => {
  const { rows } = await pool.query(
    `INSERT INTO doctors (user_id, specialization, experience)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.userId, data.specialization, data.experience]
  );
  return rows[0];
};

export const getAllDoctors = async () => {
  const { rows } = await pool.query(
    `SELECT d.*, u.name, u.email
     FROM doctors d
     JOIN users u ON d.user_id = u.id`
  );
  return rows;
};

export const getDoctorById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT d.*, u.name, u.email
     FROM doctors d
     JOIN users u ON d.user_id = u.id
     WHERE d.id = $1`,
    [id]
  );
  return rows[0];
};

export const updateDoctor = async (id: number, data: any) => {
  const { rows } = await pool.query(
    `UPDATE doctors
     SET specialization = $1,
         experience = $2
     WHERE id = $3
     RETURNING *`,
    [data.specialization, data.experience, id]
  );
  return rows[0];
};

export const deleteDoctor = async (id: number) => {
  await pool.query("DELETE FROM doctors WHERE id = $1", [id]);
};
