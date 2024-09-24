/* eslint-disable space-before-function-paren */
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'

import bcrypt from 'bcrypt'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create({ username, password }) {
    // agregar validaciones con zod
    Validation.username(username)
    Validation.password(password)

    console.log('Creating user:', username)
    // validar que no exista el usuario
    const user = User.findOne({ username })
    if (user) throw new Error('Username already exists')

    const id = crypto.randomUUID()
    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hash
    }).save()

    return id
  }

  static async login({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('Invalid username')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid password')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static username(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
  }

  static password(password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 3) throw new Error('Password must be at least 3 characters long')
  }
}
