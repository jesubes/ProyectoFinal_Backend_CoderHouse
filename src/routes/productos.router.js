import { Router } from 'express';
import ProductsManager from '../ProductManager.js';

const router = Router();

const productsM = new ProductsManager('../productos.json');



router.get('/', async (request, response) =>{
    const { limit } = request.query;
    const db = await productsM.getProducts();

    if(!limit) {
        response.send(db);
    }else {
        for(i=0; i <= limit; i++){
            response.send(db[i]);
        }
    }
    

})


router.get('/:pid', async (request, response) =>{
    id = request.params.pid;
    const product = await productsM.getProductById(id);
    response.send(product);
})



router.post('/', async (request, response) => {
    let {title, description, code, price, status, stock, category, thumbnail} = request.body;
    
    productsM.addProduct(title, description, code, price, status, stock, category, thumbnail);

    response.status(202).send(code)

})


router.put('/:pid', async (request, response) => {
    let productoActualizado = request.body;
    let id = parseInt(request.params.pid);

    productsM.updateProduct(id, productoActualizado);

    response.send(`Articulo id: ${id} <br/> ${productoActualizado}`);

})


router.delete('/:pid', async (request, response) => {
    id = request.params.pid;
    let productDelete = await productsM.deleteProduct(id);
    response.send({ status: "success", message: `El Articulo ID: ${productDelete}, esta ELIMINADO` })

})




export default router;