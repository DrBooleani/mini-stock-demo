import { Router } from "express";
import { WelcomeController } from "./controllers/welcome.controller";
import { UserController } from "./controllers/user.controller";
import { isAuthenticated } from "./middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.get("", isAuthenticated, new WelcomeController().handle);

/* Usuários */
router.post('/user', userController.createUser);
router.post('/auth', userController.authUser);

export default router;