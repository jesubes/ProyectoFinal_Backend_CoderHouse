export default class Tickets {
  constructor(dao) {
    this.dao = dao;
  }
  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async post(ticket) {
    return await this.dao.post(ticket);
  }

}
