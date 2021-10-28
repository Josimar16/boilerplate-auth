import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isAfter } from 'date-fns';
import { User } from '../../infra/typeorm/entities/User';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import IUserTokensRepository from '../../repositories/IUserTokensRepository';

@Injectable()
class ResetPasswordUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @Inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(token: string, password: string): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new NotFoundException('Usuário Token não existe!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new NotFoundException('Usuário não existe!');
    }

    if (isAfter(Date.now(), userToken.expiredAt)) {
      throw new BadRequestException('Token expirado!');
    }

    const userWithPassword = await this.usersRepository.findByEmail(user.email);

    userWithPassword.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(userWithPassword);
    return;
  }
}

export { ResetPasswordUseCase };
