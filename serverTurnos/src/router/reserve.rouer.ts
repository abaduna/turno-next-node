import express, { Request, Response, Router } from 'express'
import { verifyToken } from '../Middleware/authMiddleware'
import { getConnection } from '../module/db'

const routerReserve: Router = express.Router()


routerReserve.get("/time/:idUsuario/:dataDia/:idfield", verifyToken,async(req: Request, res: Response)=>{
    const idUsuario = req.params.idUsuario
    const dataDia = req.params.dataDia
    const idfield = req.params.idfield
    const conection = await getConnection()
    try {
      const result = await conection.
      query('SELECT * FROM time where  idUsuario = ? AND dataDia = ? AND idField = ? AND reservado = 1;',[idUsuario,dataDia,idfield])
       res.status(200).json(result)
    } catch (error) {
      console.log(`error en la consulta`, error)
      await conection.end()
      res.status(500).json({ error: error })
    }
})
routerReserve.delete("/deletd/:id", verifyToken,async(req: Request, res: Response)=>{
    const id = req.params.id
   
    const conection = await getConnection()
    try {
       await conection.
      query('UPDATE time  SET reservado = 0 where id = ?;',[id])
       res.status(200).json({message:"salio bien"})
    } catch (error) {
      console.log(`error en la consulta`, error)
      await conection.end()
      res.status(500).json({ error: error })
    }
})

routerReserve.get("/admin/:idUsuario/:dataDia/:idfield", verifyToken,async(req: Request, res: Response)=>{
  const idUsuario = req.params.idUsuario
  const dataDia = req.params.dataDia
  const idfield = req.params.idfield
  const conection = await getConnection()
  try {
    const result = await conection.
    query('SELECT * FROM time where  idUsuario = ? AND dataDia = ? AND idField = ? AND reservado = 0;',[idUsuario,dataDia,idfield])
     res.status(200).json(result)
  } catch (error) {
    console.log(`error en la consulta`, error)
    await conection.end()
    res.status(500).json({ error: error })
  }
})
routerReserve.post("/adminreserva/:id",verifyToken,async(req: Request, res: Response)=>{
  const idTime = req.params.id
 
  const conection = await getConnection()
  try {
    await conection.
    query('UPDATE time SET reservado = 1, users = "admin" WHERE id = ?;',[idTime])
    //'UPDATE * FROM time SET users = admin and reservado  where id = ?;'
     res.status(200).json({message:"update"})
  } catch (error) {
    console.log(`error en la consulta`, error)
    await conection.end()
    res.status(500).json({ error: error })
  }
})
export default routerReserve