import { Request, Response } from 'express'
import {
  generateToken,
  findUserByEmail,
  createUser,
  validateUser
} from '../services/authService'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = await createUser(email, password)

    const token = generateToken({
      id: newUser.id,
      email: newUser.email
    })

    return res.status(201).json({
      message: 'User registered successfully',
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await validateUser(email, password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken({
      id: user.id,
      email: user.email
    })

    return res.status(200).json({
      message: 'Login successful',
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}
