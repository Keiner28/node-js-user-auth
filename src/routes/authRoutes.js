import express from 'express'
import {
  renderLogin,
  renderRegister,
  loginUser,
  registerUser,
  logoutUser,
  renderHome
} from '../controllers/authController.js'

const router = express.Router()
router.get('/', renderHome)
router.get('/login', renderLogin)
router.get('/register', renderRegister)
router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/logout', logoutUser)

export default router
