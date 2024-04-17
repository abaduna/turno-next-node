import express, { Request, Response, Router } from 'express'
import { getConnection } from '../module/db'
import { verifyToken } from '../Middleware/authMiddleware'

const routerField: Router = express.Router()

routerField.get('/',verifyToken ,async (req: Request, res: Response) => {
  const conection = await getConnection()
  try {
    const result = await conection.query('SELECT * FROM field ;')
    return res.status(200).json(result)
  } catch (error) {
    await conection.end()
    res.status(500).json({ error: error })
  }
})
routerField.get('/:idusuario',verifyToken ,async (req: Request, res: Response) => {
  const conection = await getConnection()
  const idusuario = req.params.idusuario

  try {
    const result = await conection.query(
      'SELECT * FROM field WHERE idusuario =?  ;',
      [idusuario]
    )
    return res.status(200).json(result)
  } catch (error) {
    await conection.end()
    res.status(500).json({ error: error })
  }
})
routerField.post('/', verifyToken ,async (req: Request, res: Response) => {
  const conection = await getConnection()
  const { name, ubicacion, idusuario } = req.body
  const idfield = new Date().getTime()
  try {
    await conection.query(
      `INSERT INTO field (  name, ubicacion, idusuario,idfield ) VALUES (?,?,?,?);`,
      [name, ubicacion, idusuario,idfield]
    )
    res.status(200).json({ mesage: 'good post' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
routerField.put('/:id' , async (req: Request, res: Response) => {
  const { name, ubicacion, idusuario } = req.body
  const id = req.params.id
  const conection = await getConnection()
  try {
    await conection.query(
      `UPDATE field
            SET name = ?, ubicacion = ?, idusuario = ?
            WHERE id = ?`,
      [name, ubicacion, idusuario, id]
    )
    res.status(200).json({ message: 'salio bien' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
routerField.delete('/:id', verifyToken , async (req: Request, res: Response) => {
  const id = req.params.id
  const conection = await getConnection()
  try {
    await conection.query('DELETE FROM field WHERE id = ?', [id])
    res.status(200).json({ message: 'salio bien' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
export default routerField
