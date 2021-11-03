import { iUser } from "../interfaces/models/IUserModel";
import BaseRepository from "./BaseRepository";
export default class UserRepository extends BaseRepository<iUser> {
    countUsers(): Promise<unknown>;
    createUserAccount(userData: iUser): Promise<{
        exist: boolean;
        user: {};
    }>;
}
