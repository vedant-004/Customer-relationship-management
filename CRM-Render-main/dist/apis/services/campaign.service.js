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
exports.createCampaignService = createCampaignService;
exports.getAllCampaignsService = getAllCampaignsService;
const Campaign_1 = __importDefault(require("../../models/Campaign"));
function createCampaignService(userId, name, ruleId, customerIds, message, intent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCampaign = yield Campaign_1.default.create({
                userId,
                name,
                ruleId,
                customerIds,
                message,
                intent,
            });
            return newCampaign;
        }
        catch (error) {
            console.error("Error creating campaign:", error);
            return null;
        }
    });
}
function getAllCampaignsService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaigns = yield Campaign_1.default.find({ userId });
            if (!campaigns || campaigns.length === 0) {
                return null;
            }
            return campaigns;
        }
        catch (error) {
            console.error("Error fetching Campaigns:", error);
            throw new Error("Error fetching Campaigns");
        }
    });
}
//# sourceMappingURL=campaign.service.js.map