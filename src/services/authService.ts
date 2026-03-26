import jwt from 'jsonwebtoken'
import { db } from '../config/mysql'

const SECRET = 'supersecretkey'

export interface TokenPayload {
    id: number
    email: string
}

export const generateToken = (user: TokenPayload) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        SECRET,
        { expiresIn: '1h' }
    )
}

export const findUserByEmail = async (email: string) => {
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [
        email
    ])

    return rows[0] || null
}

export const createUser = async (email: string, password: string) => {
    const [result]: any = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [email, email, password]
    )

    return {
        id: result.insertId,
        email
    }
}

export const validateUser = async (email: string, password: string) => {
    const [rows]: any = await db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
    )

    return rows[0] || null
}
