import { Request, Response } from 'express'
import { generateToken } from '../services/authService'

let users: any[] = [] //tills mysql finns

export const register = (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' })
    }

    const existingUser = users.find((user) => user.email === email)

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = {
        id: users.length + 1,
        email,
        password
    }

    users.push(newUser)

    const token = generateToken({
        id: newUser.id,
        email: newUser.email
    })
    res.status(201).json({
        message: 'user registered successfully',
        token
    })
}
export const login = (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' })
    }

    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = generateToken({
        id: user.id,
        email: user.email
    })

    res.json({
        message: 'user logged in successfully',
        token
    })
}
