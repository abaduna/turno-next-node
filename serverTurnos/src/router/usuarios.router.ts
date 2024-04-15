import express, { Request, Response, Router } from 'express'
import { getConnection } from './../module/db'
import { verifyToken } from '../Middleware/authMiddleware'
const routerUsuarios: Router = express.Router()

routerUsuarios.get('/usuario', verifyToken , async (req: Request, res: Response) => {
  const conection = await getConnection()
  try {
    const result = await conection.query('SELECT * FROM usuarios;')
    return res.status(200).json(result)
  } catch (error) {
    console.log(`error en la consulta`, error)
    await conection.end()
    res.status(500).json({ error: error })
  }
})

routerUsuarios.post('/usuario', verifyToken , async (req: Request, res: Response) => {
  const conection = await getConnection()
  const { name, email, password } = req.body
  try {
    await conection.query(
      `INSERT INTO usuarios (  name, email, hashPassword ) VALUES (?,?,?);`,
      [name, email, password]
    )
    res.status(200).json({ mesage: 'good post' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
routerUsuarios.put('/usuario/:id', verifyToken , async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const id = req.params.id
  const conection = await getConnection()
  try {
    await conection.query(
      `UPDATE usuarios
            SET name = ?, email = ?, hashPassword = ?
            WHERE id = ?`,
      [name, email, password, id]
    )
    res.status(200).json({ message: 'salio bien' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
export default routerUsuarios
