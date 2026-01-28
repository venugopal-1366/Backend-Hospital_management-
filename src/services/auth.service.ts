import { pool } from "../config/db";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const registerUser = async (data: any) => {
  const hashed = await hashPassword(data.password);

  const { rows } = await pool.query(
    `INSERT INTO users(name,email,password,role)
     VALUES($1,$2,$3,$4)
     RETURNING id, role`,
    [data.name, data.email, hashed, data.role]
  );

  return rows[0];
};

export const loginUser = async (email: string, password: string) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!rows.length) throw new Error("User not found");

  const user = rows[0];
  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid password");

  return generateToken({ id: user.id, role: user.role });
};
