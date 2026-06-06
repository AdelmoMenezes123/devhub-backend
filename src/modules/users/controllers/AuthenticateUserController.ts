import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const result = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json(result);
  }
}
