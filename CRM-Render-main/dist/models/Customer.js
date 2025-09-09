"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    externalId: { type: String, index: true, sparse: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Customer', CustomerSchema);
//# sourceMappingURL=Customer.js.map