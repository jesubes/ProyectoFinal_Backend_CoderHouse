import { Router } from "express";
import CartsManager from "../Dao/dbManagers/Cart.Manager.js";
import ProductsManager from "../Dao/dbManagers/Product.Manager.js";
import MessageManager from "../Dao/dbManagers/Message.Manager.js";

const router = Router();
const productsM = new ProductsManager();
const cartsM = new CartsManager();
const messageM = new MessageManager();

router.get('/', async (request, response) => {
  let productos = await productsM.getAll();
  console.log(productos);
  response.render("productos", { productos });
});

router.get('/carts', async (request, response) => {
  let carts = await cartsM.getAll();
  console.log(carts);
  response.render('carts', { carts });
});

router.get('/chat', async (request, response) => {
  let chats = 'messages'
  console.log(chats)
  response.render('chat', {chats})
})

export default router;
