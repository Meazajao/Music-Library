import jwt from "jsonwebtoken";
import { db } from "../config/mysql";

const SECRET = "supersecretkey";

export const generateToken = (user: { id: number; email: string }) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    SECRET,
    {
      expiresIn: "1h"
    }
  );

  return token;
};


export const findUserByEmail = async (email: string) => {
  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

export const createUser = async (username: string, email: string, password: string) => {
  const [result]: any = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  return {
    id: result.insertId,
    username,
    email
  };
};