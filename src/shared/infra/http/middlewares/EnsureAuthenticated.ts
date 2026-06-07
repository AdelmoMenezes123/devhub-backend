import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../shared/config/auth";
import { AppError } from "../../../../shared/errors/AppError";

interface ITokenPayload {
  sub: string;
}

export class EnsureAuthenticated {
  async execute(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token ausente", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = verify(token, auth.jwt.secret);

      const { sub } = decoded as ITokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch {
      throw new AppError("Invalid JWT token", 401);
    }
  }
}
