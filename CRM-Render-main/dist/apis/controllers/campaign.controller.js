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
exports.createCampaign = createCampaign;
exports.getAllCampaigns = getAllCampaigns;
const response_1 = require("../../utils/response");
const campaign_service_1 = require("../services/campaign.service");
function createCampaign(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, ruleId, customerIds, message, intent } = req.body;
        const { user } = req;
        if (!name || !ruleId || !customerIds || !message) {
            return (0, response_1.error)("Please provide all required fields", 400);
        }
        const newCampaign = yield (0, campaign_service_1.createCampaignService)(user.id, name, ruleId, customerIds, message, intent);
        if (!newCampaign) {
            return (0, response_1.error)("Error creating campaign", 500);
        }
        console.log(name, ruleId, customerIds, message, intent);
        return (0, response_1.success)({
            message: "Campaign created successfully",
            campaign: newCampaign
        }, 200);
    });
}
function getAllCampaigns(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const campaigns = yield (0, campaign_service_1.getAllCampaignsService)(user.id);
        if (!campaigns || campaigns.length === 0) {
            return (0, response_1.error)("No segment rules found", 404);
        }
        if (!campaigns) {
            return (0, response_1.success)({
                message: "Error fetching campaigns rules",
            }, 500);
        }
        return (0, response_1.success)({
            message: "Campaigns fetched successfully",
            campaigns: campaigns
        }, 200);
    });
}
//# sourceMappingURL=campaign.controller.js.map