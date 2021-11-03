"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=UserModel.js.map