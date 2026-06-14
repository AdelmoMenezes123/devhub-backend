import { injectable } from "tsyringe";

import auth from "../../../shared/config/auth";

import { verify } from "jsonwebtoken";

import { IRefreshTokenDTO } from "../dtos/IRefreshTokenDTO";

import { AppError } from "../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
}

@injectable()
export class RefreshTokenService {
  constructor(private usersTokensRepository: IUsersTokensRepository) {}

  async execute({ refreshToken }: IRefreshTokenDTO) {
    const { sub: userId } = verify(refreshToken, auth.refreshToken.secret) as IPayload;

    const userToken = await this.usersTokensRepository.findByRefreshToken(refreshToken);

    if (!userToken) {
      throw new AppError("Refresh token não encontrado", 401);
    }

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
