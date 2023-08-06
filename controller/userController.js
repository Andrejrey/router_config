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
