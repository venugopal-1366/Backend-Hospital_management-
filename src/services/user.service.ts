import { pool } from '../config/db';
import { hashPassword } from '../utils/password';

export class UserService {
  async getAllUsers() {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async getUserById(id: string) {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
    return result.rows[0];
  }

  async updateUser(id: string, updateData: any) {
    const { email, firstName, lastName, role, password } = updateData;
    
    let query = 'UPDATE users SET ';
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (email) {
      updates.push(`email = $${paramIndex++}`);
      values.push(email);
    }
    
    if (firstName) {
      updates.push(`first_name = $${paramIndex++}`);
      values.push(firstName);
    }
    
    if (lastName) {
      updates.push(`last_name = $${paramIndex++}`);
      values.push(lastName);
    }
    
    if (role) {
      updates.push(`role = $${paramIndex++}`);
      values.push(role);
    }
    
    if (password) {
      const hashedPassword = await hashPassword(password);
      updates.push(`password = $${paramIndex++}`);
      values.push(hashedPassword);
    }
    
    if (updates.length === 0) {
      throw new Error('No fields to update');
    }
    
    query += updates.join(', ') + ` WHERE id = $${paramIndex} RETURNING id, email, first_name, last_name, role`;
    values.push(id);
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
    return result.rows[0];
  }

  async deleteUser(id: string) {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      throw new Error('User not found');
    }
    
    return true;
  }
}
