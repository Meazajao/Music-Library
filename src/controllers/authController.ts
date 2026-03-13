import { Request, Response } from 'express';
import { generateToken } from "../services/authService";

export const login = async (req: Request, res: Response) => {

    const { id, email } = req.body

    if (!id || !email) {
        return res.status(400).json({ message: 'ID and email are required' })
    }

    const token = generateToken({ id, email });

    res.json({
        message: 'Login successful',
        token
    });

};
