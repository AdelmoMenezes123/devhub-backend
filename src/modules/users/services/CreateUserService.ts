import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

@injectable()
export class CreateUserService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

  async execute({ name, email }: IRequest) {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("User already exists");
    }

    return this.usersRepository.create({ name, email });
  }
}
