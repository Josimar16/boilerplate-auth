import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { IUsersRepository } from '../../../../modules/accounts/repositories/IUsersRepository';
import { User } from '../../../../modules/accounts/infra/typeorm/entities/User';

interface IPayload {
  sub: string;
}

@Injectable()
class EnsureAuthenticate extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  public async validate(payload: IPayload): Promise<User> {
    const { sub: id } = payload;

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException('Acesso invalido');
    }
    return user;
  }
}

export { EnsureAuthenticate }