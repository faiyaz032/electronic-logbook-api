import User from '../models/User';
import { CreateUserInput } from '../schema/user.schema';
import AppError from '../utils/AppError';

export default class UserRepository {
  private model = User;

  /**
   * This repository function create a user in database
   */
  createEntity = async (userToCreate: CreateUserInput): Promise<CreateUserInput> => {
    try {
      const createdUser = await this.model.create(userToCreate);
      return createdUser;
    } catch (error: any) {
      throw new AppError(error.statusCode, error.message);
    }
  };
}
