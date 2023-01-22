import { Router } from "express";
const ProductsManager = require('../ProductManager')

const router = Router();

const productsM = new ProductsManager('../productos.json');



router.get('/', async (request, response) =>{
    const db = await productsM.getProducts();
    response.send(db);

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