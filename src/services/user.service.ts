import UserModel, { User } from '../models/User';

class UserService {
  private model;

  constructor() {
    this.model = UserModel;
  }

  async createUser(user: Partial<User>) {
    return this.model.create(user);
  }
}

export default UserService;
