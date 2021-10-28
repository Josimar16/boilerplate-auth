import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { addHours } from 'date-fns';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IResponseTokenDTO } from '../../dtos/IResponseTokenDTO';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../../providers/TokenProvider/models/ITokenProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import IUserTokensRepository from '../../repositories/IUserTokensRepository';

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
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IResponseTokenDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Combinação email/senha incorreta!');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Combinação email/senha incorreta!');
    }

    let reset_token_password: string;

    if (user.reset_password) {
      const newDateWithExpirationOf2Hours = addHours(new Date(), 2);

      const { token } = await this.userTokensRepository.generate(
        user.id,
        newDateWithExpirationOf2Hours,
      );

      reset_token_password = token;
    }
    
    const token = await this.tokenProvider.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        reset_password: user.reset_password,
        createdAt: user.createdAt,
      },
      reset_token_password,
    };
  }
}

export { AuthenticateUserUseCase };
