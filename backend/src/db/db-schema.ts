import { pool } from "./db-config";

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
      users_id INT AUTO_INCREMENT PRIMARY KEY,
      role INT,
      document_id INT,
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
      FOREIGN KEY (user_id) REFERENCES users(users_id)
    )
  `);

  
}
