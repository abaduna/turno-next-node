import express, { Request, Response, Router } from 'express'
import mercadopago from 'mercadopago'
import { getConnection } from '../module/db'

const routerMePA: Router = express.Router()
mercadopago.configure({
  access_token:
    'TEST-5966353069909290-041616-8d5b1072aa23bcee655e278b6906943f-207725092'
})

routerMePA.post('/create-order', async (req: Request, res: Response) => {
  const { id, user } = req.body
  console.log(req.body)

  try {
    const preference = {
      items: [
        {
          title: 'tu reserca',
          unit_price: 4,
          currency_id: 'ARS',
          description: `reseva la cancha con id ${id}`,
          quantity: 1
        }
      ],
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'https://turnitos.com/failure',
        pending: 'https://turnitos.com/pending'
      },

      auto_return: 'approved'
    }
const respons = await mercadopago.preferences.create(preference)  
   
    
    console.log(respons.status) //201
    console.log("t",respons.status===201);
    write(id, user )
  

    res.status(200).json(respons.response.init_point)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error en el post' })
  }
})
const write =async(id:string, user:string )=>{
  console.log(`write ${user}-${id}`);
  
  const conection = await getConnection()
   const data = await conection.query(
      `UPDATE time
            SET reservado = 1 , users = ?
            WHERE id = ?`,
      [user, id]
    )
    console.log(`data`,data);
    
}
routerMePA.get('/succes', (req: Request, res: Response) => {
  res.send('creattin order')
})
routerMePA.get('/webhook', (req: Request, res: Response) => {
  res.send('creattin order')
})
export default routerMePA
