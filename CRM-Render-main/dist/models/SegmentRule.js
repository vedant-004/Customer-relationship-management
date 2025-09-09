"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SegmentRuleSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    logicType: { type: String, enum: ['AND', 'OR'], required: true },
    conditions: [
        {
            field: { type: String, required: true },
            op: { type: String, required: true },
            value: { type: mongoose_1.Schema.Types.Mixed, required: true }
        }
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('SegmentRule', SegmentRuleSchema);
//# sourceMappingURL=SegmentRule.js.map