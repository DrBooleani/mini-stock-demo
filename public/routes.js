"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welcome_controller_1 = require("./controllers/welcome.controller");
const user_controller_1 = require("./controllers/user.controller");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const category_controller_1 = require("./controllers/category.controller");
const product_controller_1 = require("./controllers/product.controller");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
const categoryController = new category_controller_1.CategoryController();
const productController = new product_controller_1.ProductController();
const categoryUri = "/category";
const productUri = "/product";
router.get("", auth_middleware_1.isAuthenticated, new welcome_controller_1.WelcomeController().handle);
/* Usuários */
router.post('/user', userController.createUser);
router.post('/auth', userController.authUser);
/* Category */
router.get(categoryUri, auth_middleware_1.isAuthenticated, categoryController.listCategories);
router.post(categoryUri, auth_middleware_1.isAuthenticated, categoryController.createCategory);
router.put(categoryUri, auth_middleware_1.isAuthenticated, categoryController.updateCategory);
router.delete(categoryUri, auth_middleware_1.isAuthenticated, categoryController.deleteCategory);
/* Products */
router.get(productUri, auth_middleware_1.isAuthenticated, productController.listProducts);
router.post(productUri, auth_middleware_1.isAuthenticated, productController.createProduct);
router.put(productUri, auth_middleware_1.isAuthenticated, productController.editProduct);
router.delete(productUri, auth_middleware_1.isAuthenticated, productController.deleteProduct);
router.post(`${productUri}/sale`, auth_middleware_1.isAuthenticated, productController.saleProduct);
exports.default = router;
