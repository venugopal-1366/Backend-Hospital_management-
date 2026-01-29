import { pool } from "../config/db";
import { APPOINTMENT_STATUS } from "../constants/appointmentStatus"; 

export const getAllAppointments = async () => {
  const { rows } = await pool.query(
    `SELECT a.*, d.specialization, p.age, p.gender,
            u_d.name as doctor_name, u_p.name as patient_name
     FROM appointments a
     JOIN doctors d ON a.doctor_id = d.doctor_id
     JOIN patients p ON a.patient_id = p.patient_id
     JOIN users u_d ON d.user_id = u_d.id
     JOIN users u_p ON p.user_id = u_p.id`
  );
  return rows;
};

export const getAppointmentById = async (id: number) => {
  const { rows } = await pool.query(
    "SELECT * FROM appointments WHERE appointment_id=$1",
    [id]
  );
  return rows[0];
};

export const createAppointment = async (data: any) => {
  try {
    // Check if doctor exists
    const doctorCheck = await pool.query("SELECT doctor_id FROM doctors WHERE doctor_id = $1", [data.doctorId]);
    if (doctorCheck.rows.length === 0) {
      throw new Error(`Doctor with ID ${data.doctorId} does not exist`);
    }
    
    // Check if patient exists
    const patientCheck = await pool.query("SELECT patient_id FROM patients WHERE patient_id = $1", [data.patientId]);
    if (patientCheck.rows.length === 0) {
      throw new Error(`Patient with ID ${data.patientId} does not exist`);
    }
    
    const { rows } = await pool.query(
      `INSERT INTO appointments(doctor_id, patient_id, appointment_date, status)
       VALUES($1,$2,$3,'BOOKED') RETURNING *`,
      [data.doctorId, data.patientId, data.date]
    );
    return rows[0];
  } catch (error: any) {
    throw error;
  }
};

export const updateAppointment = async (id: number, data: any) => {
  const { rows } = await pool.query(
    `UPDATE appointments
     SET appointment_date=$1, status=$2
     WHERE appointment_id=$3 RETURNING *`,
    [data.date, data.status, id]
  );
  return rows[0];
};

export const deleteAppointment = async (id: number) => {
  await pool.query("DELETE FROM appointments WHERE appointment_id=$1", [id]);
};
