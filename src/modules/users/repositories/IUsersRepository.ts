export interface IUsersRepository {
  findByEmail(email: string): Promise<any>;
  findById(id: string): Promise<any>;
  create(data: { name: string; email: string; password: string }): Promise<any>;
}
