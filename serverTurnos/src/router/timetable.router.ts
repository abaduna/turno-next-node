import express, { Request, Response, Router } from 'express'
import { getConnection } from '../module/db'
import { verifyToken } from '../Middleware/authMiddleware'

const routerTime: Router = express.Router()

routerTime.get(
  '/:dataDia/:idfield/:idUsuario',
  verifyToken,
  async (req: Request, res: Response) => {
    console.log(req.header)

    ///api/time/2024-04-11 0:0:0/1234
    // mostra solo los reservador
    //hacer otro para que se puede editar
    const conection = await getConnection()
    const dataDia = req.params.dataDia
    const idfield = req.params.idfield
    const idUsuario = req.params.idUsuario
    try {
      const result = await conection.query(
        'SELECT * FROM time WHERE idfield = ? AND idUsuario = ? AND dataDia = ? AND reservado = false;',
        [idfield, idUsuario, dataDia]
      )
      return res.status(200).json(result)
    } catch (error) {
      console.log(`error en la consulta`, error)
      await conection.end()
      res.status(500).json({ error: error })
    }
  }
)
routerTime.put(
  '/reserver/:id/:user',
  verifyToken,
  async (req: Request, res: Response) => {
    const id = req.params.id
    const user = req.params.user
    const conection = await getConnection()
    try {
      await conection.query(
        `UPDATE time
            SET reservado = 1 , users = ?
            WHERE id = ?`,
        [user, id]
      )
      res.status(200).json({ message: '/reserver/:id/:user' })
    } catch (error) {
      console.error('Error en la consulta:', error)
      res.status(500).json({ error: 'Error en la consulta' })
    }
  }
)
routerTime.put('/put/:id', verifyToken, async (req: Request, res: Response) => {
  console.log(`put`)

  const conection = await getConnection()
  const id = req.params.id
  const { dateStart, dateEnd, idfield, reservado, dataDia, idUsuario } =
    req.body
  try {
    await conection.query(
      `UPDATE time
            SET dateStart = ?, dateEnd = ?, idfield = ?,reservado = ?,dataDia = ?,idUsuario = ?
            WHERE id = ?`,
      [dateStart, dateEnd, idfield, reservado, dataDia, idUsuario, id]
    )
    res.status(200).json({ mesage: 'good put' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
routerTime.post('/', verifyToken, async (req: Request, res: Response) => {
  const conection = await getConnection()
  const { dateStart, dateEnd, idfield, reservado, dataDia, idUsuario } =
    req.body
  try {
    await conection.query(
      `INSERT INTO time (  dateStart, dateEnd, idfield ,reservado,dataDia,idUsuario ) VALUES (?,?,?,?,?,?);`,
      [dateStart, dateEnd, idfield, reservado, dataDia, idUsuario]
    )
    res.status(200).json({ mesage: 'good post' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
routerTime.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  const conection = await getConnection()
  try {
    await conection.query('DELETE FROM time WHERE id = ?', [id])
    res.status(200).json({ message: 'salio bien' })
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).json({ error: 'Error en la consulta' })
  }
})
routerTime.get(
  '/cancel/:user',
  verifyToken,
  async (req: Request, res: Response) => {
    const user = req.params.user
    const conection = await getConnection()
    try {
      const data = await conection.query(
        'SELECT * FROM time WHERE users = ? AND reservado = 1',
        [user]
      )
      res.status(200).json({ data })
    } catch (error) {
      console.error('Error en la consulta:', error)
      res.status(500).json({ error: 'Error en la consulta' })
    }
  }
)
routerTime.patch(
  '/cancel/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    const id = req.params.id
    const conection = await getConnection()
    try {
      await conection.query(
        `UPDATE time
        SET reservado = 0
        WHERE id = ?`,
        [id]
      )
      res.status(200).json({ message: 'salio bien' })
    } catch (error) {
      console.error('Error en la consulta:', error)
      res.status(500).json({ error: 'Error en la consulta' })
    }
  }
)
export default routerTime
