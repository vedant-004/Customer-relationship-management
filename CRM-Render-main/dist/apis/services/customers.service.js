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
exports.getAllCustomersService = getAllCustomersService;
exports.updateCustomerService = updateCustomerService;
const Customer_1 = __importDefault(require("../../models/Customer"));
function getAllCustomersService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customers = yield Customer_1.default.find({ userId });
            if (!customers || customers.length === 0) {
                return null;
            }
            return customers;
        }
        catch (error) {
            console.error("Error fetching customers:", error);
            throw new Error("Error fetching customers");
        }
    });
}
function updateCustomerService(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = yield Customer_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!customer)
            throw new Error("Customer not found");
        return customer;
    });
}
//# sourceMappingURL=customers.service.js.map