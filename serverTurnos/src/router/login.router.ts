import express, { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { verifyToken } from './../Middleware/authMiddleware'
import { getConnection } from '../module/db'
import bcrypt from 'bcrypt'
const routerLogin: Router = express.Router()

routerLogin.post('/', async (req, res) => {
  const connection = await getConnection()
  const { name, password } = req.body
  console.log(req.body)

  try {
    const user = await connection.query(
      'SELECT * FROM usuarios WHERE name = ?;',
      [name]
    )

    if (user.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' })
    }
    if (typeof password !== 'string') {
      return res
        .status(400)
        .json({ message: 'La contraseña debe ser un string' })
    }

    const storedHashedPassword = user[0].hashPassword

    const isPasswordValid = await bcrypt.compare(password, storedHashedPassword)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { userId: user[0].id, user: user[0].name },
      'abaduna'
    )

    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor buena ruta' })
  }
})

routerLogin.post('/created', verifyToken, (req: Request, res: Response) => {
  res.json({ message: 'Ruta protegida accesible' })
})
//Authorization: Bearer <token>
routerLogin.post('/register', async (req: Request, res: Response) => {
  const { password, name ,email} = req.body
  const conection = await getConnection()
  const passwordHash = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      console.log(`hash ${hash}`);
      resolve(hash)
    })
  })

  try {
    await conection.query(
      `INSERT INTO usuarios (  name,email ,hashPassword ) VALUES (?,?,?);`,  [name, email,passwordHash] )
    res.status(200).json({ message: 'agregado con exito' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor buena ruta' })
  }
})

export default routerLogin
