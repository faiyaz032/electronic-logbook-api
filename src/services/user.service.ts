import UserModel, { User } from '../models/User';

class UserService {
  private model;

  constructor() {
    this.model = UserModel;
  }

  createUser = async (user: Partial<User>) => {
    return this.model.create(user);
  };

  getUserById = async (id: string) => {
    return this.model.findById(id);
  };
}

export default UserService;
