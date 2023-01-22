const express = require ('express')


import productsRouter from './routes/productos.router.js';
// import cartsRouter from './routes/cart.router.js';



const app = express(); // instanciamos express

app.use(express.json()); // middleware que permite recibir formato tipo json
app.use(express.urlencoded({exptende:true}));

const port = 8080; // designacion el puerto


// const router = Router();





//
//UTILIZANDO LOS ENDPOINT SOBRE EL ARCHIVO APP.JS


app.use('/api/products', productsRouter);

app.get('/', (request, response) =>{
    response.send('hola mundo!!!')
})




app.get('/api/products', async (request, response) =>{
    const db = await productsM.getProducts();
    response.send(db);

} )


app.get('/api/products/:pid', async (request, response) =>{
    id = request.params.pid;
    const product = await productsM.getProductById(id);
    console.log(parseInt(id));
    response.send(product);

})


app.post('/api/products', async (request, response) => {
    let {title, description, code, price, status, stock, category, thumbnail} = request.body;
    
    productsM.addProduct(title, description, code, price, status, stock, category, thumbnail);

    response.status(202).send(code)

})


app.put('/api/products/:pid', async (request, response) => {
    let productoActualizado = request.body;
    let id = parseInt(request.params.pid);

    productsM.updateProduct(id, productoActualizado);

    response.send(`Articulo id: ${id} <br/> ${productoActualizado}`);
    
})


app.delete('/api/products/:pid', async (request, response) =>{
    id = request.params.pid;
    let productDelete = await productsM.deleteProduct(id);
    response.send({status:"success", message: `El Articulo ID: ${productDelete}, esta ELIMINADO`})

})





//
//parametros sobre el puerto
//----> http://localhost:8080
app.listen( 8080, () => {
    console.log (`Escuchando en el PORT ---> ${port}`)
})




