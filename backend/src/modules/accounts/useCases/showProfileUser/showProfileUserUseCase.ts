import { Inject, Injectable } from "@nestjs/common";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserModel } from "../../repositories/models/IUserModel";

@Injectable()
class ShowProfileUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string): Promise<IUserModel> {
    return await this.usersRepository.findById(id);
  }
}

export { ShowProfileUserUseCase };
