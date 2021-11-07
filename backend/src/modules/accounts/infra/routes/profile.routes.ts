import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { UserLogged } from '../../../../shared/infra/http/middlewares/UserLogged';
import { IUserModel } from '../../repositories/models/IUserModel';
import { ShowProfileUserController } from '../../useCases/showProfileUser/showProfileUserController';

@Controller('users')
class ProfileRouter {
  constructor(private showProfileUserController: ShowProfileUserController) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async show(
    @UserLogged() user: IUserModel,
    @Res() response: Response
  ): Promise<Response> {
    return await this.showProfileUserController.handle(user, response);
  }
}

export { ProfileRouter };
