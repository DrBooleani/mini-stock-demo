import { CreateUserRequest } from "../../models/user/requests/create-user.request";
import prismaClient from "../../prisma";
import { BaseUserService } from "./user.base";

export class UserService extends BaseUserService {
  async create({name, email, password}: CreateUserRequest) {
    await this.validateEmail(email);

    const userAlreadyExists = await this.userExists(email);
    
    if (userAlreadyExists) {
      throw new Error("E-mail already exists");
    }

    const passwordHash = await this.hashPassword(password);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    return user;
  }
}