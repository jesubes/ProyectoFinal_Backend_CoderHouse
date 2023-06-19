export default class Users {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getBy(param) {
    return await this.dao.getBy(param);
  }

  async post(user) {
    return await this.dao.post(user);
  }

  async postDocuments(param, documents) {
    return await this.dao.postDocuments(param, documents);
  }

  async putBy(param, object) {
    return await this.dao.putBy(param, object);
  }

  async putPremiumRole(param) {
    return await this.dao.putPremiumRole(param);
  }

  async deleteBy(param) {
    return await this.dao.deleteBy(param);
  }

  async deleteAllOffTime(){
    return await this.dao.deleteAllOffTime();
  }
}
