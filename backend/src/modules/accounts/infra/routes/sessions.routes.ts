import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { UserLogged } from '../../../../shared/infra/http/middlewares/UserLogged';

import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IResponseRefreshToken } from '../../dtos/IResponseRefreshToken';
import { IResponseTokenDTO } from '../../dtos/IResponseTokenDTO';
import { AuthenticateUserUseCase } from '../../useCases/authenticateUser/authenticateUserUseCase';
import { RefreshTokenUseCase } from '../../useCases/refreshToken/RefreshTokenUseCase';
import { User } from '../typeorm/entities/User';

@Controller('sessions')
class SessionsRouter {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase
  ) { }

  @Post('')
  public async create(
    @Body() { email, password }: IAuthenticateUserDTO,
  ): Promise<IResponseTokenDTO> {
    return await this.authenticateUserUseCase.execute({ email, password });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh/token')
  public async refreshToken(
    @UserLogged() user: User,
    @Body() { refresh_token }: { refresh_token: string },
  ): Promise<IResponseRefreshToken> {
    const { id: user_id } = user;

    return await this.refreshTokenUseCase.execute(refresh_token, user_id);
  }
}

export { SessionsRouter };
