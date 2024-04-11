import express, { Request, Response, Router } from 'express'
import { getConnection } from '../module/db'

const routerTime: Router = express.Router()

routerTime.get('/', async (req: Request, res: Response) => {
    const conection = await getConnection()
    try {
      const result = await conection.query('SELECT * FROM time;')
      return res.status(200).json(result)
    } catch (error) {
      console.log(`error en la consulta`, error)
      await conection.end()
      res.status(500).json({ error: error })
    }
  })
  routerTime.post('/', async (req: Request, res: Response) => {
    const conection = await getConnection()
    const { dateStart, dateEnd, idfield ,reservado,dataDia,idUsuario} = req.body
    try {
      await conection.query(
        `INSERT INTO time (  dateStart, dateEnd, idfield ,reservado,dataDia,idUsuario ) VALUES (?,?,?,?,?,?);`,
        [dateStart, dateEnd, idfield ,reservado,dataDia,idUsuario]
      )
      res.status(200).json({ mesage: 'good post' })
    } catch (error) {
      console.error('Error en la consulta:', error)
      res.status(500).json({ error: 'Error en la consulta' })
    }
  })
  routerTime.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const conection = await getConnection()
    try {
      await conection.query(
        'DELETE FROM time WHERE id = ?',
        [ id]
      )
      res.status(200).json({ message: 'salio bien' })
    } catch (error) {
      console.error('Error en la consulta:', error)
      res.status(500).json({ error: 'Error en la consulta' })
    }
  })
export default routerTime