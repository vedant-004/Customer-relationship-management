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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = getAllOrders;
exports.updateOrderController = updateOrderController;
const response_1 = require("../../utils/response");
const orders_service_1 = require("../services/orders.service");
function getAllOrders(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        if (!user) {
            return (0, response_1.error)("User not authenticated.", 401);
        }
        const orders = yield (0, orders_service_1.getAllOrdersService)(user.id);
        if (!orders) {
            return (0, response_1.error)("No orders found.", 404);
        }
        return (0, response_1.success)({
            message: "Orders fetched successfully",
            orders: orders
        }, 200);
    });
}
function updateOrderController(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _a = req.body, { id } = _a, updateData = __rest(_a, ["id"]);
            if (!id) {
                return {
                    success: false,
                    status: 400,
                    response: { message: "Order ID is required" },
                };
            }
            const updatedOrder = yield (0, orders_service_1.updateOrderService)(req.body);
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
                response: { message: error.message || "Failed to update order" },
            };
        }
    });
}
//# sourceMappingURL=orders.controller.js.map