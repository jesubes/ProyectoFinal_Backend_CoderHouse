import fs from 'fs'
class CartsManager{
    constructor(path){
        this.carts;
        this.quantity;
        this.path = path;
    }

    async addCart(idProduct){
        const dbCarts = await this.getCarts();

        try{
            if(true){
                let newIdCart;
                dbCarts.length == 0 ?
                    newIdCart =1 :
                    newIdCart = dbCarts[dbCarts.length-1].id +1;
                const newCart = {...idProduct, id: newIdCart};
                dbCarts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(dbCarts));
                return newCart.id;
            }
        }
        catch (err){
            console.log(err.message);
        }

    }

    async getCarts(){
        if(fs.existsSync(this.path)){
            let listado = await fs.promises.readFile(this.path,'utf-8');
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
        const {products} = dbCarts.find((cart) => cart.id == cartId)

        if(products.some((producto) => producto.pid == productId)){

            let indexProducto = products.findIndex((producto) => producto.pid == productId)
            products[indexProducto].quantity += 1;

        }else {

            let newProduct = { pid: productId, quantity: 1}
            products.push(newProduct);
            
        }

        let indexCart = dbCarts.findIndex((cart) => cart.id == cartId);
        dbCarts[indexCart] = { products, id : cartId};
        console.log(dbCarts)

        await fs.promises.writeFile(this.path, JSON.stringify(dbCarts));

        return dbCarts[indexCart].id
        
    }
}



export default CartsManager;