export interface IUsersRepository {
  findByEmail(email: string): Promise<any>;
  create(data: { name: string; email: string }): Promise<any>;
}
