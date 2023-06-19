import {Carts, Products, Users, Tickets} from "../factory.js";
import CartsRepository from "./Carts.repository.js";
import TicketsRepository from "./Tickets.repository.js";
import ProductsRepository from "./Products.repository.js";
import UsersRepository from "./Users.repository.js";

export const CartsService = new CartsRepository(new Carts());
export const ProductsService = new ProductsRepository(new Products());
export const UsersService = new UsersRepository(new Users());
export const TicketsService = new TicketsRepository( new Tickets());
