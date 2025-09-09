import express from 'express';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { handleError } from '../../utils/response';
import { getAllOrders, updateOrderController } from '../controllers/orders.controller';


const router = express.Router();
router.route("/getAllOrders").get(
    isAuthenticated,
    handleError(getAllOrders)
)

router.route('/updateOrder').post(
  handleError(updateOrderController)
)
export default router;