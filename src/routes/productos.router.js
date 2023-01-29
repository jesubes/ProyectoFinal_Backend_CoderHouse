import { Router } from 'express';
import ProductsManager from '../ProductManager.js';

const router = Router();

const productsM = new ProductsManager('./src/productos.json');


//GET DEVUELVE TODOS LOS PRODUCTOS -- QUERY PARAMS LIMIT 
router.get('/', async (request, response) =>{
    const { limit } = request.query;
    const db = await productsM.getProducts();
    if(!limit) {
        response.send(db);
    }else {
        const listarLimit=[]
        for(let i=0; i < limit; i++){
            listarLimit.push(db[i])

        }
        response.send(listarLimit);
    }
    

})


//GET DEVUELVE UN PRODUCTO POR ID
router.get('/:pid', async (request, response) =>{
    let id = request.params.pid;
    const product = await productsM.getProductById(id);
    response.send(product);
})


//POST ingresamos NUEVO PRODUCTO
router.post('/', async (request, response) => {
    let {title, description, code, price, status, stock, category, thumbnail} = request.body;
    productsM.addProduct(title, description, code, price, status, stock, category, thumbnail);
    response.status(202).send(title)
})


//PUT ACTUALIZAMOS UN PRODUCTO POR ID
router.put('/:pid', async (request, response) => {
    const productoActualizado = request.body;
    let id = parseInt(request.params.pid);

    productsM.updateProduct(id, productoActualizado);

    response.send(productoActualizado);

})

//DELETE -- ELIMINAMOS UN PRODUCTO POR ID
router.delete('/:pid', async (request, response) => {
    let id = request.params.pid;
    let productDelete = await productsM.deleteProduct(id);
    response.send({ status: "success", message: `El Articulo ID: ${productDelete}, esta ELIMINADO` })

})




export default router;