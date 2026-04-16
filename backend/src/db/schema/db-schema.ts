import { pool } from "../config/db-config";
import bcrypt from "bcrypt";
export async function DB_schema() {
  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await pool.query(`USE \`${process.env.DB_NAME}\``);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS status (
      status_id INT AUTO_INCREMENT PRIMARY KEY,
      status_description VARCHAR(100) NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS roles (
      role_id INT AUTO_INCREMENT PRIMARY KEY,
      role_description VARCHAR(100) NOT NULL
    )
  `);

  await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    role INT,
    document_id BIGINT UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    status INT,
    FOREIGN KEY (role) REFERENCES roles(role_id),
    FOREIGN KEY (status) REFERENCES status(status_id)
  )
`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INT AUTO_INCREMENT PRIMARY KEY,
      product_name VARCHAR(100) NOT NULL,
      product_description VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status INT,
      FOREIGN KEY (status) REFERENCES status(status_id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS lots (
      lot_id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT,
      produced_at DATE,
      expired_at DATE,
      units_quantity INT,
      status INT,
      FOREIGN KEY (product_id) REFERENCES products(product_id),
      FOREIGN KEY (status) REFERENCES status(status_id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS units (
      unit_id INT AUTO_INCREMENT PRIMARY KEY,
      lot_id INT,
      status INT,
      FOREIGN KEY (lot_id) REFERENCES lots(lot_id),
      FOREIGN KEY (status) REFERENCES status(status_id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS history (
      history_id INT AUTO_INCREMENT PRIMARY KEY,
      did_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      action_code VARCHAR(50),
      entity_type VARCHAR(50),
      entity_id INT,
      description VARCHAR(255),
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
  `);


  await pool.query(`
    INSERT IGNORE INTO roles (role_id, role_description)
    VALUES (1, 'user'), (2, 'supervisor'), (3, 'admin')
  `);


  await pool.query(`
    INSERT IGNORE INTO status (status_id, status_description)
    VALUES (1, 'active'), (2, 'inactive')
  `);


  const [rows]: any = await pool.query(
    `SELECT user_id FROM users WHERE document_id = ? LIMIT 1`,
    [1234567890],
  );

  if (rows.length === 0) {
    const hashedPassword = await bcrypt.hash("1234567890", 10);

    await pool.query(
      `INSERT INTO users (role, document_id, password, user_name, status)
       VALUES (?, ?, ?, ?, ?)`,
      [3, 1234567890, hashedPassword, "root", 1],
    );

  }
}
