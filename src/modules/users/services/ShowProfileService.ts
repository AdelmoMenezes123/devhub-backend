import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
export class ShowProfileService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError("Usuário não encontrado", 404);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
