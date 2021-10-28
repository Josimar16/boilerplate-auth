import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/infra/http/middlewares/guard/jwt-auth.guard';
import { UserLogged } from 'src/shared/infra/http/middlewares/UserLogged';
// import {
//   ApiTags,
//   ApiCreatedResponse,
//   ApiUnauthorizedResponse,
// } from '@nestjs/swagger';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IResponseRefreshToken } from '../../dtos/IResponseRefreshToken';
import { IResponseTokenDTO } from '../../dtos/IResponseTokenDTO';
import { AuthenticateUserUseCase } from '../../useCases/authenticateUser/authenticateUserUseCase';
import { RefreshTokenUseCase } from '../../useCases/refreshToken/RefreshTokenUseCase';
import { User } from '../typeorm/entities/User';

@Controller('sessions')
// @ApiTags('users')
class SessionsController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase, 
    private refreshTokenUseCase: RefreshTokenUseCase
  ) { }

  @Post('')
  // @ApiUnauthorizedResponse({
  //   description: 'Combinação email/senha incorreta!',
  // })
  // @ApiCreatedResponse({
  //   description: 'Autenticação realizada com sucesso!',
  //   type: IResponseTokenDTO,
  // })
  public async create(
    @Body() { email, password }: IAuthenticateUserDTO,
  ): Promise<IResponseTokenDTO> {
    return await this.authenticateUserUseCase.execute({ email, password });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh/token')
  public async refreshToken(
    @UserLogged() user: User,
    @Body() { refresh_token}: {refresh_token: string},
  ): Promise<IResponseRefreshToken> {
    const {id: user_id} = user;

    return await this.refreshTokenUseCase.execute(refresh_token, user_id);
  }
}

export { SessionsController };
