const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "alfaxad",
    password: "ogesa123",
    database: "users",
  })
  .promise();

async function getUsers() {
  try {
    const sql = `SELECT * FROM users_details`;
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function getUser(id) {
  const sql = `SELECT * FROM users_details WHERE id=?`;
  const [result] = await pool.query(sql, [id]);
  return result;
}

async function createUser(name, age) {
  const sql = `INSERT INTO users_details(name, age) VALUES (?,?)`;
  const [result] = await pool.query(sql, [name, age]);
  return result;
}

async function updateUser(name, age, id) {
  const sql = `UPDATE users_details SET name = ?, age = ? WHERE id = ?`;
  const [result] = await pool.query(sql, [name, age, id]);
}

async function deleteUser(id) {
  const sql = `DELETE FROM users_details WHERE id = ?`;
  const [result] = await pool.query(sql, [id]);
}

async function getUserRoles() {
  const sql = `SELECT * FROM user_roles`;
  const [result] = await pool.query(sql, [id]);
  return result;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserRoles,
};
