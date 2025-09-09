import { Request, Response } from 'express';
import { AuthenticatedRequest } from "../../interfaces/interfaces";
import { error, success } from "../../utils/response";
import { getAllOrdersService, updateOrderService } from "../services/orders.service";


export async function getAllOrders(req : AuthenticatedRequest){
    const { user } = req;
    if (!user) {
        return error("User not authenticated.", 401);
    }
    const orders = await getAllOrdersService(user.id);
    if (!orders) {
        return error("No orders found.", 404);
    }
    return success({
        message: "Orders fetched successfully",
        orders: orders
    }, 200)
}

export async function updateOrderController(req: Request) {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return {
        success: false,
        status: 400,
        response: { message: "Order ID is required" },
      };
    }
    const updatedOrder = await updateOrderService(req.body);

    return {
      success: true,
      status: 200,
      response: { order: updatedOrder },
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      response: { message: error.message || "Failed to update order" },
    };
  }
}