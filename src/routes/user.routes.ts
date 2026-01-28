import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();
const userController = new UserController();

router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/', roleMiddleware('admin'), userController.getAllUsers);
router.get('/:id', roleMiddleware('admin', 'doctor'), userController.getUserById);
router.put('/:id', roleMiddleware('admin'), userController.updateUser);
router.delete('/:id', roleMiddleware('admin'), userController.deleteUser);

export { router as userRoutes };
