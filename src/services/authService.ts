import jwt from 'jsonwebtoken'

const SECRET = 'supersecretkey'

export const generateToken = (userId: { id: number; email: string }) => {
    const token = jwt.sign(
        {
            id: userId.id,
            email: userId.email
        },
        SECRET,
        {
            expiresIn: '1h'
        }
    )
    return token
}
