import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { addDays, addHours } from 'date-fns';

import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IResponseTokenDTO } from '../../dtos/IResponseTokenDTO';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../../providers/TokenProvider/models/ITokenProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

import auth from '../../../../config/auth';


@Injectable()
class AuthenticateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @Inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,

    @Inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) { }

  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IResponseTokenDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        title: 'Falha ao entrar!',
        message: 'Combinação email/senha incorreta!',
        data: null,
        cod: 'unauthorized'
      });
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException({
        title: 'Falha ao entrar!',
        message: 'Combinação email/senha incorreta!',
        data: null,
        cod: 'unauthorized'
      });
    }

    let reset_token_password: string;

    const { expires_in_refresh_token, expires_refresh_token_days, secret_refresh_token } = auth;

    const token = await this.tokenProvider.generateToken(user.id);

    // Refresh token
    const refresh_token = await this.tokenProvider.generateRefreshToken(expires_in_refresh_token, secret_refresh_token);

    const newDateWithExpirationOf30Days = addDays(new Date(), expires_refresh_token_days);

    await this.userTokensRepository.generate(
      user.id,
      refresh_token,
      newDateWithExpirationOf30Days
    );

    return {
      token,
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
      reset_token_password,
    };
  }
}

export { AuthenticateUserUseCase };
