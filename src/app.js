import express from 'express';
import __dirname from "./ultis.js"
//hay que indicar a express de que entienda que utilizaremos handlebars
import handlebars from 'express-handlebars'

import productsRouter from './routes/productos.router.js';
import cartsRouter from './routes/cart.router.js';
import viewRuter from './routes/view.router.js'
import {Server} from 'socket.io' 

import ProductsManager from './ProductManager.js';

const app = express(); // instanciamos express

//middlewares
app.use(express.json()); // middleware que permite recibir formato tipo json
app.use(express.urlencoded({exptende:true}));

const port = 8080; // designacion el puerto

//indicamos que motor de plantilla vamos a utilizar (en vez de servir archivos .html cambio por .handlebars)
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views') //dirname se va a utilizar para tener la ruta absouta de la direccion de view
app.set('view engine', 'handlebars')


//UTILIZANDO LOS ENDPOINT SOBRE EL ARCHIVO APP.JS
app.use('/', viewRuter)

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


//static files --> se hace la configuracion de los archivos de la carpeta public
app.use(express.static(__dirname + "/public"))

//
//parametros sobre el puerto
//----> http://localhost:8080
const httpServer = app.listen( 8080, () => {
    console.log (`Escuchando en el PORT ---> ${port}`)
})

const socketServer = new Server( httpServer )

const productsM = new ProductsManager('./src/productos.json')

socketServer.on('connection', async socket => {
    console.log ('Nuevo cliente conectado')
    socket.on('cliente:message', data => {
        console.log (data)
    })

    const db = await productsM.getProducts()
    socket.emit('cliente:escuchaDB', db )
})


