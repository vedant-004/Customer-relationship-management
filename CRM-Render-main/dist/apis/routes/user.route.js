"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const response_1 = require("../../utils/response");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.route('/create')
    .post([
    (0, express_validator_1.body)('token').isString().notEmpty().withMessage('token is required'),
], response_1.checkError, (0, response_1.handleError)(user_controller_1.createUser));
router.route("/getUserByEmail").get((0, response_1.handleError)(user_controller_1.getUserByEmail));
router.route('/update').post((0, response_1.handleError)(user_controller_1.updateUser));
exports.default = router;
//# sourceMappingURL=user.route.js.map