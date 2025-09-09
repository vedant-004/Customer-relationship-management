import { Router } from 'express';
import { body } from 'express-validator';
import { checkError, handleError } from '../../utils/response';
import { createUser, getUserByEmail, updateUser} from '../controllers/user.controller';

const router = Router();

router.route('/create')
.post(
  [
    body('token').isString().notEmpty().withMessage('token is required'),
  ],
  checkError,
  handleError(createUser)
)

router.route("/getUserByEmail").get(
  handleError(getUserByEmail)
)

router.route('/update').post(
  handleError(updateUser)
)
export default router;
