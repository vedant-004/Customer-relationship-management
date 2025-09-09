import { Request, Response } from 'express';
import { AuthenticatedRequest } from "../../interfaces/interfaces";
import { error, success } from "../../utils/response";
import { getAllCustomersService, updateCustomerService } from "../services/customers.service";

export async function getAllCustomers(req : AuthenticatedRequest){
    const { user } = req;
    if (!user || !user.id) {
        return error("User not authenticated.", 401);
    }
    const customers = await getAllCustomersService(user.id);
    if (!customers) {
        return error("No customers found.", 404);
    }
    return success({
        message: "Customers fetched successfully",
        customers: customers
    }, 200);
}

export async function updateCustomerDetails(req: Request) {
  try {
    const { id, name, email, phone, location, externalId } = req.body;

    const updatedCustomer = await updateCustomerService(id, {
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
  } catch (err: any) {
    console.error("Update error:", err);
    return {
      success: false,
      status: 500,
      response: err.message || "Internal server error",
    };
  }
}
