import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../shared/config/auth";
import { AppError } from "../../../shared/errors/AppError";
import { DateProvider } from "../../../shared/providers/DateProvider";
import { IUsersTokensRepository } from "../../usersTokens/repositories/IUsersTokensRepository";
import { IAuthenticateUserDTO } from "../dtos/IAuthenticateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface ITokenPayload {
  sub: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider") private dateProvider: DateProvider,
  ) {}

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

    const refreshToken = sign({ email: user.email }, auth.refreshToken.secret, {
      subject: user.id,
      expiresIn: auth.refreshToken.expiresIn as any,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(7);
    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    };
  }
}
