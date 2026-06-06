import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest) {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("User already exists", 409);
    }

    return this.usersRepository.create({ name, email, password });
  }
}
