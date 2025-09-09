import Order from '../../models/Order';

export async function getAllOrdersService(userId: string) {
  try {
    const orders = await Order.find({ userId: userId });
    if (!orders) {
      return null;
    }
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
}

export async function updateOrderService(payload: {
  id: string;
  items?: string[] | string;
  orderDate?: string;
  amount?: number;
  externalId?: string;
}) {
  try {
    // Find the order by id and update it
    const updatedOrder = await Order.findByIdAndUpdate(
      payload.id,
      {
        $set: {
          ...(payload.items !== undefined && { items: payload.items }),
          ...(payload.orderDate !== undefined && { orderDate: payload.orderDate }),
          ...(payload.amount !== undefined && { amount: payload.amount }),
          ...(payload.externalId !== undefined && { externalId: payload.externalId }),
        },
      },
      { new: true } // return the updated document
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
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      response: { message: error.message || "Error updating order" },
    };
  }
}
