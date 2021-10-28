import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
// import { User } from 'src/modules/accounts/infra/typeorm/entities/User';
// import { IUsersRepository } from 'src/modules/accounts/repositories/IUsersRepository';
import { jwtConstants } from './constants';
import { IUsersRepository } from 'src/modules/accounts/repositories/IUsersRepository';
import { User } from 'src/modules/accounts/infra/typeorm/entities/User';

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
    const { sub: id } = payload ;

    return await this.usersRepository.findById(id);
  }
}

export { EnsureAuthenticate }