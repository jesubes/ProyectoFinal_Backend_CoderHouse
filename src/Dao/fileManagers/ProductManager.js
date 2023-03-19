import fs from 'fs'
 class ProductsManager{
    constructor(path){ 
        this.products;
        this.id;
        this.path = path;
    }


    async addProduct(title, description, code, price, status, stock, category, thumbnail){
       
        const db = await this.getProducts();
       
        try{
            if(title && description && price && thumbnail && code && stock) {
                let product = { 
                       title: title,
                       description: description,
                       code: code,
                       price: price,
                       status: status,
                       stock: stock,
                       category: category,
                       thumbnail: thumbnail=[]
                    }
                let newId;
                db.length == 0?
                    newId = 1 :
                    newId = db[db.length-1].id + 1;
                const newProduct = { ...product, id: newId};
                db.push(newProduct);
                await fs.promises.writeFile(this.path,JSON.stringify(db));
                }
                else console.log('Ingresar todas las caracteristicas del producto')
        }
    
        catch(err) {
            console.log(err.message);
        }
    }


    async getProducts() {
        if (fs.existsSync(this.path)) {
            let listado = await fs.promises.readFile(this.path, 'utf-8');
            let listadoObj = JSON.parse(listado);
            this.products = listadoObj;
            return this.products;
        }else console.log(`Archivo no encontrado en ${this.path}`)
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
        await fs.promises.writeFile(this.path, JSON.stringify(db))
    }


    async deleteProduct(id){
        let listado = await fs.promises.readFile(this.path, 'utf-8');
        let listadoObj = JSON.parse(listado);
        const resultado = listadoObj.filter(lista => lista.id !== parseInt(id));
        await fs.promises.writeFile(this.path, JSON.stringify(resultado))
        return id;
        
    }
}


export default ProductsManager;