import { Request, Response } from "express";
import { generateToken, findUserByEmail, createUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser = await createUser(username, email, password);

    const token = generateToken({
      id: newUser.id,
      email: newUser.email
    });

    res.status(201).json({
      message: "user registered successfully",
      token,
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email
    });

    res.json({
      message: "user logged in successfully",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};