import express, { Request, Response, Router } from 'express'
import { getConnection } from '../module/db'

const routerCantFields: Router = express.Router()

routerCantFields.get('/:idusuario', async (req: Request, res: Response) => {
    const conection = await getConnection()
  const Iduserio = req.params.idusuario
  try {
    const result =await conection.query("SELECT * FROM cantFields WHERE idusuario = ?",[Iduserio])
    res.status(200).json(result)
  } catch (error) {
    console.log(`error en la consulta`, error)
    await conection.end()
    res.status(500).json({ error: error })
  }
})

routerCantFields.post("/", async (req: Request, res: Response) => {
    const conection = await getConnection()
    const { cantidFields, idusuario } = req.body
  
    try {
      await conection.query(
        `INSERT INTO cantFields ( cantidFields, idusuario ) VALUES (?,?);`,
        [cantidFields, idusuario ]
      )
      res.status(200).json({ mesage: 'good post post' })
    } catch (error) {
      console.error('Error en la consulta:', error)
      res.status(500).json({ error: `Error en la consulta ${error}`, })
    }
  })
  routerCantFields.delete('/:idusuario', async (req: Request, res: Response) => {
    const conection = await getConnection()
  const Iduserio = req.params.idusuario
  try {
    await conection.query("DELETE FROM cantFields WHERE idusuario = ?",[Iduserio])
    res.status(200).json({message:"eliminado con exito"})
  } catch (error) {
    console.log(`error en la consulta`, error)
    await conection.end()
    res.status(500).json({ error: error })
  }
})
export default routerCantFields
