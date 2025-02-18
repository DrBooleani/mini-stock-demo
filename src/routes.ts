import { Router } from "express";
import { WelcomeController } from "./controllers/welcome.controller";
import { UserController } from "./controllers/user.controller";
import { isAuthenticated } from "./middlewares/auth.middleware";
import { CategoryController } from "./controllers/category.controller";

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController();

const categoryUri: string = "/category";

router.get("", isAuthenticated, new WelcomeController().handle);

/* Usuários */
router.post('/user', userController.createUser);
router.post('/auth', userController.authUser);

/* Category */
router.get(categoryUri, categoryController.listCategories);
router.post(categoryUri, categoryController.createCategory);
router.put(categoryUri, categoryController.updateCategory);
router.delete(categoryUri, categoryController.deleteCategory);

export default router;