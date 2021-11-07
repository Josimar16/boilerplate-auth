import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@Injectable()
class ShowProfileUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string): Promise<User> {
    return await this.usersRepository.findById(id);
  }
}

export { ShowProfileUserUseCase };
