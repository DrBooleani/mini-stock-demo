import { Router, Request, Response } from "express";
import { WelcomeController } from "./controllers/welcome.controller";
import { UserController } from "./controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("", new WelcomeController().handle);

/* Usuários */
router.post('/user', userController.createUser)
export default router;