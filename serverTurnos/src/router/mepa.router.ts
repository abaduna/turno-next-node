import express, { Request, Response, Router } from 'express'
import mercadopago from 'mercadopago'
import { getConnection } from '../module/db'
import 'dotenv/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
const routerMePA: Router = express.Router()
console.log(process.env);
mercadopago.configure({
  access_token:process.env.ACCESS_TOKEN
})


routerMePA.post('/create-order', async (req: Request, res: Response) => {
  const { id, user } = req.body
 
 
  
  
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
      notification_url:`https://1936-190-195-87-149.ngrok-free.app/api/mepa/notificar/${id}`,
      auto_return: 'approved'
    }
const respons = await mercadopago.preferences.create(preference)  
   
    
    
const conection = await getConnection()
 await conection.query(
   `UPDATE time
         SET users = ?
         WHERE id = ?`,
   [user, id]
 )
  

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
routerMePA.post("/notificar/:id", async (req, res) => {
  try {
    const idItem = req.params.id;

    
    
    console.log(req.body);
    
    const { type, data } = req.body;
    console.log(data);
    switch (type) {
      case "payment": {
        const paymentId = data.id;
        const payment = await mercadopago.payment.findById(paymentId);
        console.log("Payment:", payment.body.status_detail);
        console.log(payment.body.items);
        if (payment.body.status_detail === "accredited") {
          console.log(`writing`);
          const conection = await getConnection()
          try {
            await conection.query(
              `UPDATE time
                    SET reservado = 1
                    WHERE id = ?`,
              [idItem]
            )
          } catch (error) {
            console.log(`error`);
            console.log(error);
          }
          
        }
        break;
      }
      case "plan": {
        const planId = data.id;
        const plan = await mercadopago.plan.findById(planId);
        console.log("Plan:", plan);
        // Realizar acciones con el objeto `plan`
        break;
      }
      case "subscription": {
        const subscriptionId = data.id;
        const subscription = await mercadopago.subscription.findById(
          subscriptionId
        );
        console.log("Subscription:", subscription);
        // Realizar acciones con el objeto `subscription`
        break;
      }
      case "invoice": {
        const invoiceId = data.id;
        const invoice = await mercadopago.invoice.findById(invoiceId);
        console.log("Invoice:", invoice);
        // Realizar acciones con el objeto `invoice`
        break;
      }
      case "point_integration_wh": {
        // La notificación puede contener otros datos que debes manejar aquí
        console.log("Point Integration:", req.body);
        break;
      }
      default: {
        console.warn("Unknown type:", type);
        break;
      }
    }

    // Responder para confirmar que se recibió la notificación
    res.status(200).send("Notification received");
  } catch (error) {
    console.error("Error handling notification:", error);
    res.status(500).send("Error handling notification");
  }
});
routerMePA.get('/succes', (req: Request, res: Response) => {
  res.send('creattin order')
})
routerMePA.get('/webhook', (req: Request, res: Response) => {
  res.send('creattin order')
})
export default routerMePA
