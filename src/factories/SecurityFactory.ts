import { iUser } from "../interfaces/models/IUserModel";
import UserModel from "../models/UserModel";
import UserRepository from "../repositories/UserRepository";

export default class SecurityFactory {

  public async createUserFactory (user: iUser) {
    const userRepository: UserRepository = new UserRepository(UserModel);
  }

}
