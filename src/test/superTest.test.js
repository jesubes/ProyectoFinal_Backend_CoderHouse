import chai from "chai";
import supertest from "supertest";
import {logger} from "../logger/logger.js";

const testingURL = "http://localhost:8080";
const expect = chai.expect;
const requester = supertest(testingURL);
const testingProducts = [
  "63e02d5597fe54556cbbcf17",
  "644ff0acd4270a6c22ad146d",
];
describe("Comenzando SuperTest!", () => {
  describe("Test de carritos", () => {
    let cartId;
    it(`Testing de obtencion de carritos - ${testingURL}/api/carts`, async () => {
      const {statusCode, ok, _body} = await requester.get("/api/carts");
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de creacion de carrito - ${testingURL}/api/carts`, async () => {
      const {statusCode, ok, _body} = await requester.post("/api/carts");
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Object);
      expect(_body.payload).to.have.own.property("products");
      expect(_body.payload.products).to.be.an.instanceof(Array);
      cartId = _body.payload._id;
    });

    it(`Testing de obtencion de carrito por ID - ${testingURL}/api/carts/:cid`, async () => {
      const {statusCode, ok, _body} = await requester.get(
        `/api/carts/${cartId}`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de adicion de producto a un carrito por ID - ${testingURL}/api/carts/:cid/products/:pid`, async () => {
      const {statusCode, ok, _body} = await requester.post(
        `/api/carts/${cartId}/products/${testingProducts[0]}`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de actualizacion de carrito por ID - ${testingURL}/api/carts/:cid/products`, async () => {
      const productsToSend = [
        {pid: testingProducts[0], quantity: 1},
        {pid: testingProducts[1], quantity: 2},
      ];
      const {statusCode, ok, _body} = await requester
        .put(`/api/carts/${cartId}/products`)
        .send({products: productsToSend});
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de actualizacion de cantidad del producto de un carrito por ID - ${testingURL}/api/carts/:cid/products/:pid`, async () => {
      const {statusCode, ok, _body} = await requester
        .put(`/api/carts/${cartId}/products/${testingProducts[0]}`)
        .send({quantity: 20});
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de eliminacion del producto de un carrito por ID - ${testingURL}/api/carts/:cid/products/:pid`, async () => {
      const {statusCode, ok, _body} = await requester.delete(
        `/api/carts/${cartId}/products/${testingProducts[1]}`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de compra de un carrito por ID - ${testingURL}/api/carts/:cid/purchase`, async () => {
      const {statusCode, ok, _body} = await requester.post(
        `/api/carts/${cartId}/purchase`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Object);
    });

    it(`Testing de eliminacion de los productos de un carrito por ID - ${testingURL}/api/carts/:cid/products`, async () => {
      const {statusCode, ok, _body} = await requester.delete(
        `/api/carts/${cartId}/products`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de eliminacion de un carrito por ID - ${testingURL}/api/carts/:cid`, async () => {
      const {statusCode, ok, _body} = await requester.delete(
        `/api/carts/${cartId}`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body).to.have.own.property("message");
    });
  });
  describe("Test de productos", () => {
    const mockProduct = {
      title: "Testing product",
      description: "Descripcion de prueba para testing",
      code: "PRTS1",
      price: 50000,
      stock: 200,
      category: "testing",
      thumbnails: ["...links"],
      owner: "coderTesting@gmail.com",
    };
    let mockProductId;

    it(`Testing de obtencion de todos los productos - ${testingURL}/api/products`, async () => {
      const {statusCode, ok, _body} = await requester.get(`/api/products`);
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Array);
    });

    it(`Testing de obtencion de un producto por ID - ${testingURL}/api/products/:pid`, async () => {
      const {statusCode, ok, _body} = await requester.get(
        `/api/products/${testingProducts[0]}`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Object);
    });

    it(`Testing de creacion de un producto - ${testingURL}/api/products/`, async () => {
      const {statusCode, ok, _body} = await requester
        .post(`/api/products/`)
        .send(mockProduct);
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Object);
      mockProductId = _body.payload._id;
    });

    it(`Testing de actualizacion de un producto por ID - ${testingURL}/api/products/:pid/`, async () => {
      const {statusCode, ok, _body} = await requester
        .put(`/api/products/${mockProductId}`)
        .send({description: "descripcion actualizada desde un test"});
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an.instanceof(Object);
    });

    it(`Testing de eliminacion de un producto por ID - ${testingURL}/api/products/:pid`, async () => {
      const {statusCode, ok, _body} = await requester.delete(
        `/api/products/${mockProductId}`
      );
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body).to.have.own.property("message");
    });
  });

  describe("Test de sesiones", () => {
    const mockUser = {
      firstName: "testing",
      lastName: "by mocha",
      email: "coderTesting@gmail.com",
      password: "codertest",
    };
    let cookie;

    it(`Testing de registro - ${testingURL}/api/session/register`, async () => {
      const {statusCode, ok, _body} = await requester
        .post(`/api/session/register`)
        .send({...mockUser});
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body);
    }).timeout(10000);

    it(`Testing de inicio de sesion - ${testingURL}/api/session/login`, async () => {
      const response = await requester
        .post(`/api/session/login`)
        .send({email: mockUser.email, password: mockUser.password});
      const {statusCode, ok, _body} = response;
      const cookieResult = response.header["set-cookie"][0];
      cookie = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body);
    }).timeout(10000);

    it(`Testing current con jwt - ${testingURL}/api/session/current`, async () => {
      const response = await requester
        .get(`/api/session/current`)
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      const {statusCode, ok, _body} = response;
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body);
    }).timeout(10000);

    it(`Testing de cierre de sesion - ${testingURL}/api/session/logout`, async () => {
      const response = await requester
        .post(`/api/session/logout`)
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      const {statusCode, ok, _body} = response;
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body);
    }).timeout(10000);

    it(`Testing de eliminacion del usuario de testing - ${testingURL}/api/users/by?email=example`, async () => {
      const response = await requester.delete(
        `/api/users/by?email=${mockUser.email}`
      );
      const {statusCode, ok, _body} = response;
      expect(statusCode).to.deep.equal(200);
      expect(ok).to.be.true;
      expect(_body);
    }).timeout(10000);
  });
});
