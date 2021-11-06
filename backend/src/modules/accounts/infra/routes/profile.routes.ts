import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { UserLogged } from '../../../../shared/infra/http/middlewares/UserLogged';
import { ShowProfileUserController } from '../../useCases/showProfileUser/showProfileUserController';
import { User } from '../typeorm/entities/User';

@Controller('users')
class ProfileRouter {
  constructor(private showProfileUserController: ShowProfileUserController) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async show(
    @UserLogged() user: User,
    @Res() response: Response
  ): Promise<Response> {
    return await this.showProfileUserController.handle(user, response);
  }
}

export { ProfileRouter };
