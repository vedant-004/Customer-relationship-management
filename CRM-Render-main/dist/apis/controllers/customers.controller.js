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
exports.getAllCustomers = getAllCustomers;
exports.updateCustomerDetails = updateCustomerDetails;
const response_1 = require("../../utils/response");
const customers_service_1 = require("../services/customers.service");
function getAllCustomers(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        if (!user || !user.id) {
            return (0, response_1.error)("User not authenticated.", 401);
        }
        const customers = yield (0, customers_service_1.getAllCustomersService)(user.id);
        if (!customers) {
            return (0, response_1.error)("No customers found.", 404);
        }
        return (0, response_1.success)({
            message: "Customers fetched successfully",
            customers: customers
        }, 200);
    });
}
function updateCustomerDetails(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, name, email, phone, location, externalId } = req.body;
            const updatedCustomer = yield (0, customers_service_1.updateCustomerService)(id, {
                name,
                email,
                phone,
                location,
                externalId,
            });
            return {
                success: true,
                status: 200,
                response: updatedCustomer,
            };
        }
        catch (err) {
            console.error("Update error:", err);
            return {
                success: false,
                status: 500,
                response: err.message || "Internal server error",
            };
        }
    });
}
//# sourceMappingURL=customers.controller.js.map