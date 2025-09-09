"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CampaignSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    intent: { type: String },
    ruleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'SegmentRule', required: true },
    customerIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' }],
    status: { type: String, enum: ['draft', 'sent', 'error'], default: 'draft' },
    sentAt: Date,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Campaign', CampaignSchema);
//# sourceMappingURL=Campaign.js.map