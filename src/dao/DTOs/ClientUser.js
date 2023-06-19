export default class ClientUser {
  constructor(backendUser) {
    this.fullName = `${backendUser.firstName} ${backendUser.lastName}`;
    this.email = backendUser.email;
    this.role = backendUser.role;
  }
}
