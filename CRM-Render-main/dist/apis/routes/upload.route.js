"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_controller_1 = require("../controllers/upload.controller");
const response_1 = require("../../utils/response");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.route("/customers").post(auth_middleware_1.isAuthenticated, upload.single('file'), (0, response_1.handleError)(upload_controller_1.uploadCustomersController));
router.route("/orders").post(auth_middleware_1.isAuthenticated, upload.single('file'), (0, response_1.handleError)(upload_controller_1.uploadOrdersController));
exports.default = router;
//# sourceMappingURL=upload.route.js.map