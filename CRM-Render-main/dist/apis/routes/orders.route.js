"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_1 = require("../../utils/response");
const orders_controller_1 = require("../controllers/orders.controller");
const router = express_1.default.Router();
router.route("/getAllOrders").get(auth_middleware_1.isAuthenticated, (0, response_1.handleError)(orders_controller_1.getAllOrders));
router.route('/updateOrder').post((0, response_1.handleError)(orders_controller_1.updateOrderController));
exports.default = router;
//# sourceMappingURL=orders.route.js.map