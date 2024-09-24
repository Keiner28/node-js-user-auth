import express from 'express'
import { renderProtectedPage } from '../controllers/protectedController.js'

const router = express.Router()

router.get('/protected', renderProtectedPage)

export default router
