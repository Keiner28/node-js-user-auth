import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3001
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) // Convertir a número
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
