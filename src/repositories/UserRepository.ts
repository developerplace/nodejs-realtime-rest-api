import { compareSync } from "bcrypt";
import { encode, decode } from "jwt-simple";
import moment from "moment";
import { iUser } from "../interfaces/models/IUserModel";
import BaseRepository from "./BaseRepository";

export default class UserRepository extends BaseRepository<iUser> {

  /**
   * Get all users
   */
  public async getAllUsers(): Promise<iUser[]> {
    return await this.getAllDocuments();
  }

  /**
   * Get all users filtered by parameters
   * @param multiple
   * @param parameters
   */
  public async getUsersByParameters(multiple: boolean = false, parameters: object = {}): Promise<iUser | iUser[]> {
    if (multiple) {
      return await this.getAllDocumentsByParameters(parameters);
    } else {
      return await this.getOneDocumentByParameters(parameters);
    }
  }

  /**
   * Create new user account
   * @param userData
   */
  public async createUserAccount(userData: iUser): Promise<iUser> {
    await this.createDocument(userData);
    return await this.getOneDocumentByParameters({ email: userData.email });
  }

  public async activateUserAccount(email: string, otpCode: string): Promise<iUser> {
    let storedUser: object = await this.getOneDocumentByParameters({
                                                                     email: email,
                                                                     active: false,
                                                                     enabled: true,
                                                                     otpCode: Number(otpCode),
                                                                   });
    if (!storedUser) {
      throw new Error("User not found");
    }
    let storedUserObj: iUser = storedUser as iUser;
    storedUserObj.otpCode = 0;
    storedUserObj.active = true;
    return await this.updateDocument(storedUserObj._id, storedUserObj);
  }

  /**
   * Login user
   * @param email
   * @param passwordString
   */
  public async loginUserAccount(email: string, passwordString: string): Promise<iUser> {
    let storedUser: iUser = await this.getOneDocumentByParameters({ email: email, enabled: true });
    if (!storedUser) {
      throw new Error("User not found");
    }
    let storedUserObj: iUser = storedUser as iUser;
    const comparePassword = compareSync(passwordString, storedUserObj.password);
    if (!comparePassword) {
      throw new Error("Wrong password");
    }
    storedUserObj.lastLogin = new Date();
    return await this.updateDocument(storedUserObj._id, storedUserObj);
  }

  /**
   * Generate JWT
   * @param userId
   */
  public generateJwtUserAccount(userId: string): string {
    const secret: string = process.env.JWT_SECRET || "nothing";
    const expire: number = moment().add(6, "hours").unix();
    return encode({ uid: userId, expire }, secret);
  }

  /**
   * Decode JWT
   * @param jwt
   */
  public async decodeJwtUserAccount(jwt: string): Promise<iUser> {
    const secret: string = process.env.JWT_SECRET || "nothing";
    const payload: any = await decode(jwt, secret);
    if (!payload.hasOwnProperty("uid")) {
      throw new Error("Invalid token");
    }
    const user: iUser = await this.getOneDocumentByParameters({ _id: payload.uid, enabled: true });
    if (!user) {
      throw new Error("User not found");
    }
    const currentTimestamp: number = moment().unix();
    const expireJwtTimestamp: number = payload.expire;
    if (currentTimestamp > expireJwtTimestamp) {
      throw new Error("Expired token");
    }
    return user;
  }

}
