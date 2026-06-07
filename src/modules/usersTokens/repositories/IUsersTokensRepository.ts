import { UserTokens } from "@prisma/client";

import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;

  findByRefreshToken(refreshToken: string): Promise<UserTokens | null>;

  deleteById(id: string): Promise<void>;
}
