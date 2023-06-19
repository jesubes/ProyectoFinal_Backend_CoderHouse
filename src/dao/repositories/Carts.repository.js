export default class Carts {
  constructor(dao) {
    this.dao = dao;
  }
  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async post(products) {
    return await this.dao.post(products);
  }

  async postProductToCart(cid, pid, user) {
    return await this.dao.postProductToCart(cid, pid, user);
  }

  async putProducts(cid, products) {
    return await this.dao.putProducts(cid, products);
  }

  async putProductQuantity(cid, pid, quantity) {
    return await this.dao.putProductQuantity(cid, pid, quantity);
  }

  async deleteProductToCart(cid, pid) {
    return await this.dao.deleteProductToCart(cid, pid);
  }

  async deleteProducts(cid) {
    return await this.dao.deleteProducts(cid);
  }

  async deleteById(cid) {
    return await this.dao.deleteById(cid);
  }

  async purchase(cid, purchaser) {
    return await this.dao.purchase(cid, purchaser);
  }
}
