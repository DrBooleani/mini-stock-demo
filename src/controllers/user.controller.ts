import { Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { CreateUserRequest } from "../models/user/requests/create-user.request";
import { AuthUserRequest } from "../models/user/requests/auth-user.request";

export class UserController {
  private readonly userService: UserService = new UserService();

  createUser = async (request: Request, response: Response) => {
    const { name, email, password}: CreateUserRequest = request.body;
    try {
      const user = await this.userService.create({name, email, password});
      response.status(201).json(user);
    } catch (error: any) {
      this.handleError(response, error);
    }
  };

  authUser = async (request: Request, response: Response) => {
    const { email, password }: AuthUserRequest = request.body;
    try {
      const auth = await this.userService.auth({email, password});
      response.status(200).json(auth);
    } catch (error: any) {
      this.handleError(response, error)
    }
  };

  private handleError(response: Response, error: any) {
    response.status(400).json({ error: error.message });
  }
}