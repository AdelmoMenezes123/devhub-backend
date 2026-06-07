import { prisma } from "../../../shared/database/prisma";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<any> {
    return prisma.user.findUnique({ where: { email: email } });
  }

  async findById(id: string): Promise<any> {
    return prisma.user.findUnique({ where: { id: id } });
  }

  async create(data: { name: string; email: string; password: string }): Promise<any> {
    return prisma.user.create({ data });
  }
}
