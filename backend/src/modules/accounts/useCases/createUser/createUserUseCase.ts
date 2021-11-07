import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserModel } from "../../repositories/models/IUserModel";

@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,

    @Inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ name, email, password }: ICreateUserDTO): Promise<IUserModel> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      throw new BadRequestException('Usuário com esse email já existe!');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    });

    return user;
  }
}

export { CreateUserUseCase }