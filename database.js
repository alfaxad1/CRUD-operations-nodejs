const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "alfaxad",
    password: "ogesa123",
    database: "users",
  })
  .promise();

async function getUsers() {
  try {
    const [result] = await pool.query("SELECT * FROM users_details");
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function getUser(id) {
  const [result] = await pool.query(`SELECT * FROM users_details WHERE id=?`, [
    id,
  ]);
  return result;
}

async function createUser(name, age) {
  const [result] = await pool.query(
    `INSERT INTO users_details(name, age) VALUES (?,?)`,
    [name, age]
  );
  return result;
}

async function updateUser(name, age, id) {
  const [result] = await pool.query(
    `UPDATE users_details SET name = ?, age = ? WHERE id = ?`,
    [name, age, id]
  );
}

async function deleteUser(id) {
  const [result] = await pool.query(`DELETE FROM users_details WHERE id = ?`, [
    id,
  ]);
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
