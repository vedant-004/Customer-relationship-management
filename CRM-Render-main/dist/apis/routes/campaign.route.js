"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_1 = require("../../utils/response");
const campaign_controller_1 = require("../controllers/campaign.controller");
const router = express_1.default.Router();
router.route("/create").post(auth_middleware_1.isAuthenticated, (0, response_1.handleError)(campaign_controller_1.createCampaign));
router.route('/getAllCampaigns').get(auth_middleware_1.isAuthenticated, (0, response_1.handleError)(campaign_controller_1.getAllCampaigns));
exports.default = router;
//# sourceMappingURL=campaign.route.js.map