"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const BaseRepository_1 = __importDefault(require("./BaseRepository"));
class UserRepository extends BaseRepository_1.default {
    countUsers() {
        return this.getAllDocuments();
    }
    async createUserAccount(userData) {
        try {
            let response = {
                exist: true,
                user: {},
            };
            const salt = (0, bcrypt_1.genSaltSync)(10);
            userData.password = (0, bcrypt_1.hashSync)(userData.password, salt);
            userData.otpCode = userData.hasOwnProperty("otpCode") ? userData.otpCode : 0;
            userData.active = userData.hasOwnProperty("active") ? userData.active : false;
            userData.enabled = userData.hasOwnProperty("enabled") ? userData.enabled : false;
            userData.roles = userData.hasOwnProperty("roles") ? userData.roles : ["ROLE_USER"];
            await this.createDocument(userData);
            const createdUser = await this.getOneDocumentByParameters({ email: userData.email });
            // TODO - Enviar correo electrónico notificando el OTP para activar la cuenta
            response.exist = false;
            response.user = createdUser;
            return response;
        }
        catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map