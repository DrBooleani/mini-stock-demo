import { Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { CreateUserRequest } from "../models/user/requests/create-user.request";

export class UserController {
  userService: UserService = new UserService();

  createUser = async (request: Request, response: Response) => {
    const { name, email, password}: CreateUserRequest = request.body;
    try {
      const user = await this.userService.create({name, email, password});
      response.status(201).json(user);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };

}