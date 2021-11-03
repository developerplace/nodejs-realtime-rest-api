import { Schema, model } from "mongoose";
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

export default model<iUser>("User", UserSchema);
