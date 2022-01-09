import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { IResponseRefreshToken } from '../../dtos/IResponseRefreshToken';
import { AuthenticateUserController } from '../../useCases/authenticateUser/authenticateUserController';
import { RefreshTokenController } from '../../useCases/refreshToken/refreshTokenController';

@Controller('sessions')
class SessionsRouter {
  constructor(
    private authenticateUserController: AuthenticateUserController,
    private refreshTokenController: RefreshTokenController
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
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {

    return await this.refreshTokenController.handle(request, response);
  }
}

export { SessionsRouter };
