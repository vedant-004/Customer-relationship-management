"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer', required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    items: [String],
    orderDate: { type: Date, required: true },
    externalId: { type: String, index: true, sparse: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Order', OrderSchema);
//# sourceMappingURL=Order.js.map