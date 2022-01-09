import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isAfter } from 'date-fns';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

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
      throw new NotFoundException({
        title: 'Falha ao recuperar senha!',
        message: 'Token não existe!',
        data: null,
        cod: 'not.found'
      });
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new NotFoundException({
        title: 'Falha ao recuperar senha!',
        message: 'Usuário não existe!',
        data: null,
        cod: 'not.found'
      });
    }

    if (isAfter(Date.now(), userToken.expired_at)) {
      throw new BadRequestException({
        title: 'Falha ao recuperar senha!',
        message: 'Token expirado!',
        data: null,
        cod: 'token.expired'
      });
    }

    const userWithPassword = await this.usersRepository.findByEmail(user.email);

    userWithPassword.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(userWithPassword);
    return;
  }
}

export { ResetPasswordUseCase };
