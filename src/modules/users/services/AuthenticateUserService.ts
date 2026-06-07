import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "../../../shared/config/auth";
import { AppError } from "../../../shared/errors/AppError";
import { IAuthenticateUserDTO } from "../dtos/IAuthenticateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface ITokenPayload {
  sub: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    // Payload com dados do usuário
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = sign(payload, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn as any,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
