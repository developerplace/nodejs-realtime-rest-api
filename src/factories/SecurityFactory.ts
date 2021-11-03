import { iUser } from "../interfaces/models/IUserModel";
import UserModel from "../models/UserModel";
import UserRepository from "../repositories/UserRepository";

export default class SecurityFactory {

  /**
   * Create user factory
   * @param username
   * @param email
   * @param password
   */
  public async createUserFactory(username: string, email: string, password: string): Promise<iUser> {
    const userRepository: UserRepository = new UserRepository(UserModel);
    const user: iUser = await userRepository.getOneDocumentByParameters({ username, email });
    if (user) {
      throw new Error("User exists");
    }
    return await userRepository.createUserAccount({ username, email, password });
  }

  /**
   * Login user factory
   * @param email
   * @param password
   */
  public async loginUserAndGetJWTFactory(email: string, password: string): Promise<string> {
    const userRepository: UserRepository = new UserRepository(UserModel);
    const user: iUser = await userRepository.getOneDocumentByParameters({ email });
    if (!user) {
      throw new Error("User not exists");
    }
    const userValid: iUser = await userRepository.loginUserAccount(email, password);
    if (!userValid) {
      throw new Error("Wrong user or password");
    }
    return userRepository.generateJwtUserAccount(userValid._id);
  }

}
