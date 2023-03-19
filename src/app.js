import express  from "express";
import __dirname from "./ultis.js"
import handlebars from "express-handlebars" 
import mongoose from "mongoose";

import productsRouter from "./routes/productos.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewRouter from "./routes/view.router.js"

import {Server} from "socket.io"

const app = express()

//middlewares
app.use(express.json()) //middleware que permite recibir formato tipo json
app.use(express.urlencoded({extended: true}))

const PORT = 8080

//conection mongodb
const connection = mongoose.connect('mongodb+srv://jesus:873089@cluster0.qxkrs16.mongodb.net/?retryWrites=true&w=majority')

//indicamos que motor de plantilla vamos a utilizar (en vez de servir archivos .html cambio por .handlebars)
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//utilizamos los endpoint sobre el archivo app.js
app.use('/', viewRouter)

app.use('/api/produts', productsRouter)
app.use('/api/carts', cartsRouter)

//static files --> se hace la configuracion de los archivos de la carpeta public
app.use(express.static(__dirname + "/public"))

//parametros sobre el puerto --> http://localhost:8080
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en el PORT ---> ${ PORT }`)
})

const socketServer = new Server( httpServer )


//conection webSocket
socketServer.on('connetion', async (socket) => {
  console.log('Nuevo cliente conectado')
  socket.on('cliente: message', data => {
    console.log(data)
  })

  const db = await productos.getAll()  //!!! atencion que no es lo esperado solo modo prueba
  socket.emit('cliente:ecuchaDB', db )
})