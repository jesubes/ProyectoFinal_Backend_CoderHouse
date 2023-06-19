import mongoose from "mongoose";
import config from "../config/config.js";

export let Carts;
export let Products;
export let Users;
export let Tickets;

switch (config.persistence) {
  case "mongodb":
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongoUrl, (error) => {
      if (error) {
        console.log("No hubo conexion", error);
        process.exit();
      }
      console.log("Conexion con Mongodb exitosa");
    });
    const {default: CartsMongo} = await import(
      "./classes/dbManager/CartsManager.js"
    );
    const {default: ProductsMongo} = await import(
      "./classes/dbManager/ProductsManager.js"
    );
    
    const {default: UsersMongo} = await import(
      "./classes/dbManager/UsersManager.js"
    );

    const {default: TicketsMongo} = await import(
      "./classes/dbManager/TicketsManager.js"
    );
    
    Carts = CartsMongo;
    Products = ProductsMongo;
    Users = UsersMongo;
    Tickets = TicketsMongo;
    break;

  case "filesystem":
    console.log("Working with filesystem");

    const {default: CartsMemory} = await import(
      "./classes/fileManager/CartsManager.js"
    );
    const {default: ProductsMemory} = await import(
      "./classes/fileManager/ProductsManager.js"
    );
    const {default: UsersMemory} = await import(
      "./classes/fileManager/UsersManager.js"
    );

    Carts = CartsMemory;
    Products = ProductsMemory;
    Users = UsersMemory;
    break;
}
