import {fs} from 'fs'

class CartsManager{
    constructor(carts= [], id=0, path= './carrito.json'){
        this.carts = carts
        this.id = id;
        this.quantity = quantity;
        this.path = path;
    }

    async addCart(idProduct){
        const dbCarts = await this.getCarts();
        try{
            if(this.quantity){
                let cart = {   //---------->> REVISAR
                    idProduct: idProduct,
                    quantity: quantity
                }
                let newId;
                dbCarts.length == 0 ?
                    newId =1 :
                    newId = db[dbCarts.length-1].id +1;
                const newCart = {...cart, id: newId};
                dbCarts.push(newCart)
                await fs.promises.writeFile('./carrito.json', JSON.stringify(dbCarts));
            }
        }
        catch (err){
            console.log(err.message);
        }
        return newCart.id;
    }

    async getCarts(){
        if(fs.existsSync('./carrito.json')){
            let listado = await fs.promises.readFile('./carrito.json','utf-8');
            let listadoObj = JSON.parse(listado);
            this.carts = listadoObj;
            return this.carts;
        }
    }

    async getCartsById(cid){
        const dbCarts = await this.getCarts();
        const cartFind = dbCarts.find((cart) => cart.id == cid);
        if (cartFind){
            return cartFind;
        }else console.log("No existe ID del carrito Solicitado")
    }

    async addProductToCart(cartId, productId){
        let dbCarts = await this.getCarts();
        const cartFind = dbCarts.find((cart) => cart.id == cartId)
        if(cartFind.some((producto) => producto.idProduct == productId)){
            let actualizarCantidad = cartFind.find((producto) => producto.idProduct == productId);
            actualizarCantidad.quantity = actualizarCantidad.quantity + 1;
            let indexProducto = cartFind.findIndex((producto) => producto.idProduct == productId)
            cartFind[indexProducto] = { ...actualizarCantidad, }
        }else {
            let newProduct = { idProduct:productId, qunatity: 1}
            cartFind.push(newProduct);
        }

        let indexCart = dbCarts.findIndex((cart) => cart.id == cartId);
        dbCarts[indexCart] = { ...cartFind};

        await fs.promises.writeFile('./carrito.json', JSON.stringify(dbCarts));
        
    }
}


module.exports = CartsManager;