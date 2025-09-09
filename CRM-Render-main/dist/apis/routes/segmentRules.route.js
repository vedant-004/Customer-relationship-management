"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_1 = require("../../utils/response");
const segmentRules_controller_1 = require("../controllers/segmentRules.controller");
const router = express_1.default.Router();
router.route("/create").post(auth_middleware_1.isAuthenticated, (0, response_1.handleError)(segmentRules_controller_1.createSegmentRule));
router.route("/getAllSegmentRules").get(auth_middleware_1.isAuthenticated, (0, response_1.handleError)(segmentRules_controller_1.getAllSegmentRules));
exports.default = router;
//# sourceMappingURL=segmentRules.route.js.map