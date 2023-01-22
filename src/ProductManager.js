const fs = require ('fs');

class ProductsManager{
    constructor( products= [], id=0, path = './productos.json'){
        this.products = products;
        this.id = id;
        this.path = path;
    }


    async addProduct(title, description, code, price, status, stock, category, thumbnail){
        const db = await this.getProducts();
        
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


    async getProducts() {
        if (fs.existsSync('./productos.json')) {
            let listado = await fs.promises.readFile('./productos.json', 'utf-8');
            let listadoObj = JSON.parse(listado);
            this.products = listadoObj;
            return this.products;
        }
    }


    async getProductById(id) {
        const db = await this.getProducts();
        const find = db.find((product) => product.id == id)
        if (find) {
            return find
        } else console.log("No existe ID del producto");
    }


    async updateProduct(id, newProduct) {
        const db = await this.getProducts();
        if (db.some((product) => product.id == id)) {
            let indexProduct = db.findIndex((product) => product.id == id)
            db[indexProduct] = { ...newProduct, id };
        }
        await fs.promises.writeFile('./productos.json', JSON.stringify(db))
    }


    async deleteProduct(id){
        let listado = await fs.promises.readFile('./productos.json', 'utf-8');
        let listadoObj = JSON.parse(listado);
        const resultado = listadoObj.filter(lista => lista.id !== parseInt(id));
        await fs.promises.writeFile('./productos.json', JSON.stringify(resultado))
        return id;
        
    }
}


module.exports = ProductsManager;