import express, { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { verifyToken } from './../Middleware/authMiddleware'
import { getConnection } from '../module/db'
import bcrypt from 'bcrypt';
const routerLogin: Router = express.Router()

routerLogin.post('/', async (req: Request, res: Response) => {
  const connection = await getConnection()
  const { name, password } = req.body
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordToString = password.toString()
    const hashedPassword = await bcrypt.hash(passwordToString, salt);

    console.log(`hashedPassword ${hashedPassword}`)

    const user = await connection.query(
      'SELECT * FROM usuarios WHERE name = ? AND hashPassword = ? ;',
      [name, hashedPassword]
    )
    jwt.sign({ user: user }, 'secretKey', (err, token) => {
      res.json({ token: token })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
})

routerLogin.post('/created', verifyToken, (req: Request, res: Response) => {
  res.json({ message: 'Ruta protegida accesible' })
})
//Authorization: Bearer <token>

export default routerLogin
