import { container } from "tsyringe";
import { DateProvider } from "../providers/DateProvider";

import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";
import { IUsersTokensRepository } from "../../modules/usersTokens/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "../../modules/usersTokens/repositories/UsersTokensRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IUsersTokensRepository>("UsersTokensRepository", UsersTokensRepository);
container.registerSingleton("DateProvider", DateProvider);
