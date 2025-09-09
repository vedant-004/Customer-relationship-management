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
exports.createSegmentRule = createSegmentRule;
exports.getAllSegmentRules = getAllSegmentRules;
const response_1 = require("../../utils/response");
const segmentRules_service_1 = require("../services/segmentRules.service");
function createSegmentRule(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const { logicType, conditions } = req.body;
        const newSegmentRule = yield (0, segmentRules_service_1.createSegmentRuleService)(user.id, logicType, conditions);
        if (!newSegmentRule) {
            return (0, response_1.success)({
                message: "Error creating segment rule",
            }, 500);
        }
        return (0, response_1.success)({
            message: "Segment rule created successfully",
        }, 200);
    });
}
function getAllSegmentRules(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const segmentRules = yield (0, segmentRules_service_1.getAllSegmentRulesService)(user.id);
        if (!segmentRules || segmentRules.length === 0) {
            return (0, response_1.error)("No segment rules found", 404);
        }
        if (!segmentRules) {
            return (0, response_1.success)({
                message: "Error fetching segment rules",
            }, 500);
        }
        return (0, response_1.success)({
            message: "Segment rules fetched successfully",
            segmentRules: segmentRules
        }, 200);
    });
}
//# sourceMappingURL=segmentRules.controller.js.map