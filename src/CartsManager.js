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
        console.log('products tamaño --->', artArr.length )
        console.log('productId -->', productId)

        // if(products.some((producto) => producto.pid == productId)){
        //     console.log('ENCONTRADO....')
        //     let actualizarCantidad = cartFind.find((producto) => producto.idProduct == productId);
        //     actualizarCantidad.quantity = actualizarCantidad.quantity + 1;
        //     let indexProducto = cartFind.findIndex((producto) => producto.idProduct == productId)
        //     cartFind[indexProducto] = { ...actualizarCantidad, }
        // }else {
        //     console.log('NUEVO ARTICULO AL CARRRITO')
        //     let newProduct = { pid: productId, qunatity: 1}
        //     products.push(newProduct);
        //     console.log('productos del carrito actulizado', products)
        // }

        // let indexCart = dbCarts.findIndex((cart) => cart.id == cartId);
        // dbCarts[indexCart] = { ...products, id : cartId};

        // await fs.promises.writeFile(this.path, JSON.stringify(dbCarts));

        // return dbCarts[indexCart].id
        
    }
}



export default CartsManager;