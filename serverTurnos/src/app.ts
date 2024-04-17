import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
const app = express()
const port = 3001

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

import routerUsuarios from './router/usuarios.router'
app.use('/api', routerUsuarios)

import routerField from './router/field.router'
app.use('/api/field', routerField)

import routerTime from './router/timetable.router'
app.use('/api/time', routerTime)



import routerLogin from './router/login.router'
app.use('/api/login', routerLogin)

import routerMePA from './router/mepa.router'
app.use("/api/mepa",routerMePA)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
