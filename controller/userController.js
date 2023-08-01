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
