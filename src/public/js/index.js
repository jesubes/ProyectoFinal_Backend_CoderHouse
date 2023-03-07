const socket = io()  //instanciamos el socket

const productos = document.querySelector('#producto')

const addProduct = (product) => {
    productos.innerHTML +=  `
    <div class="element">
        <h4>title -> ${product.title}</h4>
        <li>description -> ${product.description}</li>
        <li>price -> ${product.price}</li>
    </div>
    `
}

socket.emit('cliente:message', 'Envio un msj desde index.js al SERVIDOR')

socket.on('cliente:escuchaDB', (data) => {
    data.forEach(element => addProduct(element));
})