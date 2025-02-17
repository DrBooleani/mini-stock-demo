import { AuthUserRequest } from "../../models/user/requests/auth-user.request";
import { CreateUserRequest } from "../../models/user/requests/create-user.request";
import prismaClient from "../../prisma";
import { BaseUserService } from "./user.base";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

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

  async auth({email, password}: AuthUserRequest) {
    await this.validateEmail(email);

    if (!password) {
      throw new Error("Password needs to be provided!");
    }

    const user = await this.userExists(email);
    if (!user) {
      throw new Error("Wrong username/password");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Wrong username/password");
    }

    const token = this.generateToken(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }

  private generateToken(user: any) {
    return sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET || 'NAOTEMCHAVESECRETA' as string,
      {
        subject: user.id,
        expiresIn: '1h'
      }
    );
  }
}