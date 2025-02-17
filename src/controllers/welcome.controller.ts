import { Request, Response } from "express";

export class WelcomeController {
  handle(req: Request, res: Response) {
    res.json({message: "Welcome to MiniStock Server"});
  }
}