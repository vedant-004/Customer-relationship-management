import Customer from "../../models/Customer";


export async function getAllCustomersService(userId: string) {
    try {
        const customers = await Customer.find({ userId });
        if (!customers || customers.length === 0) {
            return null;
        }
        return customers;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw new Error("Error fetching customers");
    }
}

export async function updateCustomerService(id: string, updateData: any) {
  const customer = await Customer.findByIdAndUpdate(id, updateData, {
    new: true, 
    runValidators: true,
  });
  if (!customer) throw new Error("Customer not found");
  return customer;
}