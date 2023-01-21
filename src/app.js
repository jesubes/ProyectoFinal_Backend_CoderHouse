const express = require('express')
const fs = require ('fs');
const { send } = require('process');
const { stringify } = require('querystring');
// import { Router } from 'express';
// const ProductsManager = require('./productos.json')




const app = express(); // instanciamos express

app.use(express.json()); // middleware que permite recibir formato tipo json
app.use(express.urlencoded({exptende:true}));


const port = 8080; // designacion el puerto


// const router = Router();


//
//PRODUCTOS

async function getProducts() {
    if (fs.existsSync('./productos.json')) {
        let listado = await fs.promises.readFile('./productos.json', 'utf-8');
        let listadoObj = JSON.parse(listado);
        
        return listadoObj;
    }
}


async function getProductById(id) {
    const db = await getProducts();
    const find = db.find((product) => product.id == id)
    if (find) {
        return find
    } else console.log("No existe ID del producto");

}


async function addProduct(title, description, code, price, status, stock, category, thumbnail){
    const db = await getProducts();
    
    try{
        if(title && description && description && thumbnail && code && stock) {
            let product = { 
                   title: title,
                   description: description,
                   code: code,
                   price: price,
                   status: status,
                   stock: stock,
                   category: category,
                   thumbnail: thumbnail
                }
            let newId;
            db.length == 0?
                newId = 1 :
                newId = db[db.length-1].id + 1;
            const newProduct = { ...product, id: newId};
            db.push(newProduct);
            await fs.promises.writeFile('./productos.json',JSON.stringify(db));
            }
    }

    catch(err) {
        console.log(err.message);
    }
}


async function updateProduct(id, newProduct){
    const db = await getProducts();
    if (db.some((product) => product.id == id)){
        let indexProduct = db.findIndex((product) => product.id == id)
        db[indexProduct] = {...newProduct,id};
    }
    await fs.promises.writeFile('./productos.json', JSON.stringify(db))

}



async function deleteProduct(id){
    let listado = await fs.promises.readFile('./productos.json', 'utf-8');
    let listadoObj = JSON.parse(listado);
    const resultado = listadoObj.filter(lista => lista.id !== parseInt(id));
    await fs.promises.writeFile('./productos.json', JSON.stringify(resultado))
    return id;
    
}


// const data = ;



//
//UTILIZANDO LOS ENDPOINT SOBRE EL ARCHIVO APP.JS

app.get('/', (request, response) =>{
    response.send('hola mundo!!!')
})


app.get('/api/products', async (request, response) =>{
    const db = await getProducts();
    response.send(db);

} )


app.get('/api/products/:pid', async (request, response) =>{
    id = request.params.pid;
    const product = await getProductById(id);
    console.log(parseInt(id));
    response.send(product);

})


app.post('/api/products', async (request, response) => {
    let {title, description, code, price, status, stock, category, thumbnail} = request.body;
    
    addProduct(title, description, code, price, status, stock, category, thumbnail);

    response.status(202).send(code)

})


app.put('/api/products/:pid', async (request, response) => {
    let productoActualizado = request.body;
    let id = parseInt(request.params.pid);

    updateProduct(id, productoActualizado);

    response.send(`Articulo id: ${id} <br/> ${productoActualizado}`);
    
})


app.delete('/api/products/:pid', async (request, response) =>{
    id = request.params.pid;
    let productDelete = await deleteProduct(id);
    console.log(`Articulo Eliminado ---> ID: ${productDelete}`)
    response.send({status:"success", message: `El Articulo ID: ${productDelete}, esta ELIMINADO`})

})





//
//parametros sobre el puerto
//----> http://localhost:8080
app.listen( 8080, () => {
    console.log (`Escuchando en el PORT ---> ${port}`)
})




