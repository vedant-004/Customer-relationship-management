"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_1 = require("../../utils/response");
const customers_controller_1 = require("../controllers/customers.controller");
const router = express_1.default.Router();
router.route("/getAllCustomers").get(auth_middleware_1.isAuthenticated, (0, response_1.handleError)(customers_controller_1.getAllCustomers));
router.route('/updateCustomer').post((0, response_1.handleError)(customers_controller_1.updateCustomerDetails));
exports.default = router;
//# sourceMappingURL=customers.route.js.map