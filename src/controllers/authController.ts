import { Request, Response } from 'express';
import { generateToken } from "../services/authService";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }
        // tillf'llig login tills databsen kopplas
        if (email === "test@test.com" && password === "123456") {
            // Skapa en token
        }

    const token = generateToken({ id: 1, email });

    res.json({
        message: 'Login successful',
        token
    });

};
