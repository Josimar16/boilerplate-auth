import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as path from 'path'
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from "../../repositories/IUsersRepository";

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

  public async execute({ name, email }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);
    console.log(userExists)
    if (userExists) {
      throw new BadRequestException('Usuário com esse email já existe!');
    }

    const passwordRandom = Math.random().toString(36).substring(6);

    const password = await this.hashProvider.generateHash(passwordRandom);

    const user = await this.usersRepository.create({
      name,
      email,
      password
    });

    const newPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'new_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Aplicacao] Nova senha de acesso',
      templateData: {
        file: newPasswordTemplate,
        variables: {
          name: user.name,
          password: passwordRandom,
          link: `${process.env.APP_WEB_URL}/`,
        },
      },
    });

    return user;
  }
}

export { CreateUserUseCase }