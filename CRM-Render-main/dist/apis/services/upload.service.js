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
exports.processCustomerRow = processCustomerRow;
exports.processOrderRow = processOrderRow;
const Customer_1 = __importDefault(require("../../models/Customer"));
const Order_1 = __importDefault(require("../../models/Order"));
function processCustomerRow(row, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { customer_external_id, name, email, phone, location } = row;
        let query = { userId };
        if (customer_external_id) {
            query.externalId = customer_external_id;
        }
        else {
            query.email = email;
        }
        const customerData = {
            userId,
            name,
            email,
            phone: phone || undefined,
            location: location || undefined,
            externalId: customer_external_id || undefined,
        };
        const existingCustomer = yield Customer_1.default.findOne(query);
        if (existingCustomer) {
            Object.assign(existingCustomer, customerData);
            return existingCustomer.save();
        }
        else {
            if (!customer_external_id) {
                const emailCheck = yield Customer_1.default.findOne({ email, userId });
                if (emailCheck) {
                    Object.assign(emailCheck, customerData);
                    return emailCheck.save();
                }
            }
            return Customer_1.default.create(customerData);
        }
    });
}
function processOrderRow(row, userId, customerCache) {
    return __awaiter(this, void 0, void 0, function* () {
        const { order_external_id, customer_identifier, items_description, total_amount, order_date } = row;
        let customer = customerCache.get(customer_identifier); // customer can be ICustomer | undefined here
        if (!customer) {
            const foundCustomer = yield Customer_1.default.findOne({
                userId,
                $or: [{ email: customer_identifier }, { externalId: customer_identifier }],
            });
            if (foundCustomer) { //not null
                customer = foundCustomer;
            }
        }
        if (!customer) {
            console.warn(`Customer not found for identifier: ${customer_identifier}. Skipping order ${order_external_id || 'N/A'}.`);
            return null;
        }
        if (!customerCache.has(customer_identifier)) {
            customerCache.set(customer_identifier, customer);
        }
        if (customer.email && customer.email !== customer_identifier && !customerCache.has(customer.email)) {
            customerCache.set(customer.email, customer);
        }
        if (customer.externalId && customer.externalId !== customer_identifier && !customerCache.has(customer.externalId)) {
            customerCache.set(customer.externalId, customer);
        }
        const orderData = {
            userId,
            customerId: customer._id,
            items: items_description ? [items_description] : [],
            amount: parseFloat(total_amount),
            orderDate: new Date(order_date),
            externalId: order_external_id || undefined,
        };
        let orderQuery = { userId, customerId: customer._id };
        if (order_external_id) {
            orderQuery.externalId = order_external_id;
        }
        else {
            return Order_1.default.create(orderData);
        }
        const existingOrder = yield Order_1.default.findOne(orderQuery);
        if (existingOrder) {
            Object.assign(existingOrder, orderData);
            return existingOrder.save();
        }
        else {
            return Order_1.default.create(orderData);
        }
    });
}
//# sourceMappingURL=upload.service.js.map