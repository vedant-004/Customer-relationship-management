"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserByEmail = getUserByEmail;
exports.updateUser = updateUser;
const response_1 = require("../../utils/response");
const user_service_1 = require("../services/user.service");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
function createUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.body;
        if (!token) {
            return (0, response_1.error)("Token is required", 400);
        }
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        if (!ticket) {
            return (0, response_1.error)("Invalid token", 401);
        }
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return (0, response_1.error)("Invalid token", 401);
        }
        const { name, email, picture: avatarUrl } = payload;
        const provider = 'google';
        const newUser = yield (0, user_service_1.createUserService)(email, name, provider, avatarUrl);
        return (0, response_1.success)({
            message: "User LoggedIn successfully",
            user: newUser
        }, 201);
    });
}
function getUserByEmail(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.query;
        console.log(email);
        if (!email) {
            return (0, response_1.error)("Email is required", 400);
        }
        const user = yield (0, user_service_1.getUserByEmailService)(email);
        if (!user) {
            return (0, response_1.error)("User not found", 404);
        }
        return (0, response_1.success)({
            message: "User fetched successfully",
            user: user
        }, 200);
    });
}
function updateUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, field, value } = req.body;
        if (!id || !field || typeof value === 'undefined') {
            return (0, response_1.error)("Missing required fields: id, field, value", 400);
        }
        const updatedUser = yield (0, user_service_1.updateUserService)(id, field, value);
        if (!updatedUser) {
            return (0, response_1.error)("Unable to update details", 422);
        }
        return (0, response_1.success)({
            message: "User details updated successfully",
            user: updatedUser,
        }, 200);
    });
}
//# sourceMappingURL=user.controller.js.map