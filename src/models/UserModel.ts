import { randomInt } from "crypto";
import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcrypt";
import { iUser } from "../interfaces/models/IUserModel";

const UserSchema = new Schema({
                                username: {
                                  type: String,
                                  required: true,
                                  unique: true,
                                  index: true,
                                },
                                email: {
                                  type: String,
                                  required: true,
                                  unique: true,
                                  index: true,
                                },
                                password: {
                                  type: String,
                                  required: true,
                                },
                                avatar: {
                                  type: String,
                                  required: false,
                                },
                                roles: {
                                  type: Array,
                                  required: true,
                                  default: ["ROLE_USER"],
                                },
                                active: {
                                  type: Boolean,
                                  required: true,
                                  default: false,
                                },
                                enabled: {
                                  type: Boolean,
                                  required: true,
                                  default: false,
                                },
                                otpCode: {
                                  type: Number,
                                  required: false,
                                },
                                lastLogin: {
                                  type: Date,
                                  required: false,
                                },
                              }, {
                                timestamps: true,
                              });

UserSchema.pre<iUser>("save", function save(next): void {
  const user: iUser = this;
  user.otpCode = randomInt(100000, 999999);
  user.avatar = "none";
  user.roles = ["ROLE_USER"];
  user.active = false;
  user.enabled = true;
  genSalt(10, (err: Error | undefined, salt: string) => {
    if (err) {
      return next(err);
    }
    hash(this.password, salt, (err: Error, hash: string) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

export default model<iUser>("User", UserSchema);
