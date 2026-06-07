import { UserTokens } from "@prisma/client";

import { prisma } from "../../../shared/database/prisma";

import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "./IUsersTokensRepository";

export class UsersTokensRepository implements IUsersTokensRepository {
  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    return prisma.userTokens.create({
      data,
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens | null> {
    return prisma.userTokens.findUnique({
      where: {
        refreshToken,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userTokens.delete({
      where: {
        id,
      },
    });
  }
}
