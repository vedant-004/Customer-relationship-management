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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSegmentRuleService = createSegmentRuleService;
exports.getAllSegmentRulesService = getAllSegmentRulesService;
const SegmentRule_1 = __importDefault(require("../../models/SegmentRule"));
function createSegmentRuleService(userId, logicType, conditions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newSegmentRule = new SegmentRule_1.default({
                userId,
                logicType,
                conditions
            });
            const savedSegmentRule = yield newSegmentRule.save();
            return savedSegmentRule;
        }
        catch (error) {
            console.error("Error creating segment rule:", error);
            throw new Error("Error creating segment rule");
        }
    });
}
function getAllSegmentRulesService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const segmentRules = yield SegmentRule_1.default.find({ userId });
            if (!segmentRules || segmentRules.length === 0) {
                return null;
            }
            return segmentRules;
        }
        catch (error) {
            console.error("Error fetching segment rules:", error);
            throw new Error("Error fetching segment rules");
        }
    });
}
//# sourceMappingURL=segmentRules.service.js.map