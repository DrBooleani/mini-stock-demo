import { Router } from "express";
import { WelcomeController } from "./controllers/welcome.controller";
import { UserController } from "./controllers/user.controller";
import { isAuthenticated } from "./middlewares/auth.middleware";
import { CategoryController } from "./controllers/category.controller";
import { ProductController } from "./controllers/product.controller";

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController();
const productController = new ProductController();

const categoryUri: string = "/category";
const productUri: string = "/product";

router.get("", isAuthenticated, new WelcomeController().handle);

/* Usuários */
router.post('/user', userController.createUser);
router.post('/auth', userController.authUser);

/* Category */
router.get(categoryUri, isAuthenticated, categoryController.listCategories);
router.post(categoryUri, isAuthenticated, categoryController.createCategory);
router.put(categoryUri, isAuthenticated, categoryController.updateCategory);
router.delete(categoryUri, isAuthenticated, categoryController.deleteCategory);

/* Products */
router.get(productUri, isAuthenticated, productController.listProducts);
router.post(productUri, isAuthenticated, productController.createProduct);
router.put(productUri, isAuthenticated, productController.editProduct);
router.delete(productUri, isAuthenticated, productController.deleteProduct);
router.post(`${productUri}/sale`, isAuthenticated, productController.saleProduct);

export default router;