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
exports.success = success;
exports.error = error;
exports.handleError = handleError;
exports.checkError = checkError;
const express_validator_1 = require("express-validator");
function success(result = 'OK', status = 200) {
    const sanitizedResult = JSON.parse(JSON.stringify(result, (_, value) => typeof value === 'bigint' ? value.toString() : value));
    return {
        status,
        success: true,
        response: sanitizedResult,
    };
}
function error(message = 'Some internal server error occurred', status = 500) {
    return {
        status,
        success: false,
        response: message,
    };
}
function handleError(controller) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { success, status, response } = yield controller(req, res);
            res.status(status).json({ status, success, response });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(error((err === null || err === void 0 ? void 0 : err.message) || 'Some internal server error occurred', 500));
        }
    });
}
function checkError(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(error(errors.array()[0].msg, 422));
    }
    else {
        next();
    }
}
//# sourceMappingURL=response.js.map