
import { Router } from 'express';
import CartsManager from '../CartsManager.js';
import ProductsManager from '../ProductManager.js'


const router = Router();
const CartsM = new CartsManager('./src/carrito.json');
const productsM = new ProductsManager('./src/productos.json');


router.get('/:cid', async (request, response) =>{
    let cid = request.params.cid;
    const cart = await CartsM.getCartsById(cid);  // 
    response.send(cart)
})


router.post('/', async(request, response) =>{
    const productsCart = request.body; // solo se captura el id del producto a agregar en el carrito
    let idCart = await CartsM.addCart(productsCart); // se crea una funcion para crear carritos con los id de los productos pasados por parametros
    response.status(202).send({status: "success", message: `Carrito agregado ID --> ${idCart}`})
})


router.post('/:cid/products/:pid', async(request, response) =>{
    let cartId = parseInt(request.params.cid);
    let productId = request.params.pid;
    let {id} = await productsM.getProductById(productId); // confimar si el producto esta en el archivo ./productos.json

    let idCart = await CartsM.addProductToCart(cartId,id);
    
    response.status(202).send({status: "success", message: `Producto con ID -> ${productId}, Agregado al Carrito ID: ${idCart}`});
})



export default router;