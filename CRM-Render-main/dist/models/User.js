"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    provider: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=User.js.map