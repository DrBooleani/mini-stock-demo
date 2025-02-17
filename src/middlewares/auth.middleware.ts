import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from '../models/user/Payload';
import dotenv from "dotenv";

dotenv.config();

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization as string;
  
  if (!authToken || typeof authToken !== 'string') {
    response.sendStatus(401);
    return;
  }

  const token = authToken.split(" ")[1];

  if (!token) {
    response.sendStatus(401);
    return;
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET || 'NAOTEMCHAVESECRETA' as string) as Payload;
    request.user_id = sub;
    next();
  } catch (error) {
    response.sendStatus(401);
  }
}