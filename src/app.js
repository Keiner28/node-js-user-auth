import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { PORT, SECRET_JWT_KEY } from './config.js'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Obtener __dirname en un entorno ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())

// Middleware para verificar el token y establecer el usuario en la sesión
app.use((req, res, next) => {
  const token = req.cookies.acces_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch (error) {
    req.session.user = null
  }
  next()
})

// Rutas de autenticación y rutas protegidas
app.use(authRoutes)
app.use(protectedRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
