# CoderCommerce

##### Proyecto del Curso de Coder Houser de Backend E-commerce - Node.js - Express - Mongo 


## Instalacion


```bash
  npm install
```

## Iniciacion

Comando de terminal para iniciar el desarrollo:

```bash
  npm run start
```


## Referencia de la API

### Productos

#### Obtener todos los productos: `GET URL: /api/products?`

#### Obtener producto por ID: `GET URL: /api/products/:pid`

#### Crear un producto nuevo: `POST URL: /api/products`

#### Actualizar un producto por ID: `PUT URL: /api/products/pid`

#### Eliminar un producto: `DELETE URL: /api/products`

### Carritos

#### Obtener todos los carritos: `GET URL: /api/carts`

#### Obtener un carrito por ID: `GET URL: /api/carts/cid`

#### Crear un carrito nuevo: `POST URL: /api/carts`

#### Agregar un producto a un carrito por ID: `POST URL: /api/carts/cid/pid`

#### Actualizar los productos de un carrito por ID: `PUT URL: /api/carts/cid/pid`


#### Actualizar la cantidad de un producto por ID en un carrito por ID: `PUT URL: /api/carts/cid/pid`

#### Eliminar un producto por ID de un carrito por ID: `DELETE URL: /api/carts/cid/pid`

#### Eliminar todos los productos de un carrito por ID: `DELETE URL: /api/carts/cid/products`

#### Eliminar un carrito por ID: `DELETE URL: /api/carts/cid`

#### Comprar un carrito por ID: `DELETE URL: /api/carts/cid/purchase`

### Usuarios

#### Obtener todos los usuarios: `GET URL: /api/users`

#### Obtener un usuario por email o id: `GET URL: /api/users/by?`, ejemplo: `/api/users/by?

#### Crear un nuevo usuario: `POST URL: /api/users`


#### Actualizar un usuario por email o ID: `PUT URL: /api/users/by?`

#### Actualizar el rol premium de un usuario por email o ID: `PUT URL: /api/users/premium/by?`

#### Eliminar un usuario por email o ID: `DELETE URL: /api/users/by?`

### Session

#### Registrar un usuario: `POST URL: /api/session/register`




#### Cerrar sesion con un usuario: `POST URL: /api/session/logout`

#### Enviar correo de recuperacion: `POST URL: /api/session/recover`

#### Reestablecer contraseña de un usuario: `POST URL: /api/session/recoverPassword/:token`


#### Obtener la informacion cifrada en una cookie por medio de Json web token: `GET URL: /api/session/current`