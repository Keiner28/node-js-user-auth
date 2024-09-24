import { UserRepository } from '../user-repository.js'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'

export const renderHome = (req, res) => {
  res.render('layout', { user: req.session.user, body: 'home' })
}

export const renderLogin = (req, res) => {
  res.render('layout', { body: 'login' })
}

export const renderRegister = (req, res) => {
  res.render('layout', { body: 'register' })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: '1h'
    })
    res
      .cookie('acces_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .redirect('/protected')
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const registerUser = async (req, res) => {
  const { username, password } = req.body
  try {
    await UserRepository.create({ username, password })
    res.redirect('/login')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('acces_token').redirect('/')
}
