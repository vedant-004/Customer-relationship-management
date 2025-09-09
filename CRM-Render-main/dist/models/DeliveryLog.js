"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DeliveryLogSchema = new mongoose_1.Schema({
    campaignId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer', required: true },
    status: { type: String, enum: ['success', 'failed'], required: true },
    errorMessage: String,
    sentAt: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)('DeliveryLog', DeliveryLogSchema);
//# sourceMappingURL=DeliveryLog.js.map