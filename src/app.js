const express = require ('express')


import productsRouter from './routes/productos.router.js';
import cartsRouter from './routes/cart.router.js';



const app = express(); // instanciamos express

app.use(express.json()); // middleware que permite recibir formato tipo json
app.use(express.urlencoded({exptende:true}));

const port = 8080; // designacion el puerto


//UTILIZANDO LOS ENDPOINT SOBRE EL ARCHIVO APP.JS
app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);

app.get('/', (request, response) =>{
    response.send('hola mundo!!!')
})


//
//parametros sobre el puerto
//----> http://localhost:8080
app.listen( 8080, () => {
    console.log (`Escuchando en el PORT ---> ${port}`)
})




