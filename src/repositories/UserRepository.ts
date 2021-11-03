import { genSaltSync, hashSync } from "bcrypt";
import { iUser } from "../interfaces/models/IUserModel";
import BaseRepository from "./BaseRepository";

export default class UserRepository extends BaseRepository<iUser> {

  public countUsers () {
    return this.getAllDocuments();
  }

  public async createUserAccount(userData: iUser) {
    try {
      let response = {
        exist: true,
        user: {}
      };
      const salt = genSaltSync(10);
      userData.password = hashSync(userData.password, salt);
      userData.otpCode = (userData.hasOwnProperty('otpCode')) ? userData.otpCode : 0;
      userData.active = (userData.hasOwnProperty('active')) ? userData.active : false;
      userData.enabled = (userData.hasOwnProperty('enabled')) ? userData.enabled : false;
      userData.roles = (userData.hasOwnProperty('roles')) ? userData.roles : ["ROLE_USER"];
      await this.createDocument(userData);
      const createdUser = await this.getOneDocumentByParameters({email: userData.email});
      // TODO - Enviar correo electrónico notificando el OTP para activar la cuenta
      response.exist = false;
      response.user = createdUser;
      return response;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

}
