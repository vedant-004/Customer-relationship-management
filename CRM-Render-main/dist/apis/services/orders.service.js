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
exports.getAllOrdersService = getAllOrdersService;
exports.updateOrderService = updateOrderService;
const Order_1 = __importDefault(require("../../models/Order"));
function getAllOrdersService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield Order_1.default.find({ userId: userId });
            if (!orders) {
                return null;
            }
            return orders;
        }
        catch (error) {
            console.error('Error fetching orders:', error);
            return null;
        }
    });
}
function updateOrderService(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find the order by id and update it
            const updatedOrder = yield Order_1.default.findByIdAndUpdate(payload.id, {
                $set: Object.assign(Object.assign(Object.assign(Object.assign({}, (payload.items !== undefined && { items: payload.items })), (payload.orderDate !== undefined && { orderDate: payload.orderDate })), (payload.amount !== undefined && { amount: payload.amount })), (payload.externalId !== undefined && { externalId: payload.externalId })),
            }, { new: true } // return the updated document
            );
            if (!updatedOrder) {
                return {
                    success: false,
                    status: 404,
                    response: { message: "Order not found" },
                };
            }
            return {
                success: true,
                status: 200,
                response: { order: updatedOrder },
            };
        }
        catch (error) {
            return {
                success: false,
                status: 500,
                response: { message: error.message || "Error updating order" },
            };
        }
    });
}
//# sourceMappingURL=orders.service.js.map