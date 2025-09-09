"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AIAuditLogSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['message-generator', 'parser'], required: true },
    input: { type: String, required: true },
    output: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('AIAuditLog', AIAuditLogSchema);
//# sourceMappingURL=AIAuditLog.js.map