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
exports.isAuthenticated = isAuthenticated;
const google_auth_library_1 = require("google-auth-library");
const user_service_1 = require("../apis/services/user.service");
const response_1 = require("../utils/response");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new google_auth_library_1.OAuth2Client(GOOGLE_CLIENT_ID);
if (!GOOGLE_CLIENT_ID) {
    console.error("FATAL ERROR: GOOGLE_CLIENT_ID is not defined in .env file for auth middleware.");
    process.exit(1);
}
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json((0, response_1.error)('No token provided or token format is incorrect.', 401));
            return;
        }
        const idToken = authHeader.split(' ')[1];
        if (!idToken) {
            res.status(401).json((0, response_1.error)('No token provided.', 401));
            return;
        }
        if (!GOOGLE_CLIENT_ID) {
            console.error("Google Client ID is not configured for token verification in middleware.");
            res.status(500).json((0, response_1.error)('Server configuration error.', 500));
            return;
        }
        try {
            const ticket = yield client.verifyIdToken({
                idToken: idToken,
                audience: GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                res.status(401).json((0, response_1.error)('Invalid token: Missing payload or email.', 401));
                return;
            }
            const user = yield (0, user_service_1.getUserByEmailService)(payload.email);
            if (!user) {
                res.status(403).json((0, response_1.error)('User not found in our system. Please sign up or log in again.', 403));
                return;
            }
            req.user = {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            };
            next();
        }
        catch (err) {
            console.error('Token verification error:', err);
            res.status(401).json((0, response_1.error)('Invalid or expired token.', 401));
            return;
        }
    });
}
//# sourceMappingURL=auth.middleware.js.map