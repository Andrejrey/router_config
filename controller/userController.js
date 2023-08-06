import pool from "../client.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getUser = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    res.json({ data: req.user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, age } = req.body;
    if (!first_name || !last_name || !age)
      throw new ErrorResponse("Invalid input", 400);
    const { rows } = await pool.query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING * ",
      [first_name, last_name, age]
    );
    return res.status(201).json({ message: "User created", data: rows });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, age } = req.body;
    const { rows } = await pool.query(
      "UPDATE users set first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING * ",
      [first_name, last_name, age, id]
    );
    return res.json({ message: "User updates", data: rows });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "DELETE from users WHERE id = $1 RETURNING *",
      [id]
    );
    return res.json({ message: "User deleted", data: rows });
  } catch (error) {
    next(error);
  }
};
