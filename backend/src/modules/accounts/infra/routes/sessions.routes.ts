import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { UserLogged } from '../../../../shared/infra/http/middlewares/UserLogged';

import { IResponseRefreshToken } from '../../dtos/IResponseRefreshToken';
import { AuthenticateUserController } from '../../useCases/authenticateUser/authenticateUserController';
import { RefreshTokenUseCase } from '../../useCases/refreshToken/RefreshTokenUseCase';
import { IUserModel } from '../../repositories/models/IUserModel';
@Controller('sessions')
class SessionsRouter {
  constructor(
    private authenticateUserController: AuthenticateUserController,
    private refreshTokenUseCase: RefreshTokenUseCase
  ) { }

  @Post('')
  public async create(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    return await this.authenticateUserController.handle(request, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh/token')
  public async refreshToken(
    @UserLogged() user: IUserModel,
    @Body() { refresh_token }: { refresh_token: string },
  ): Promise<IResponseRefreshToken> {
    const { id: user_id } = user;

    return await this.refreshTokenUseCase.execute(refresh_token, user_id);
  }
}

export { SessionsRouter };
