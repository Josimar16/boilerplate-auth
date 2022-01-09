import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { ShowProfileUserController } from '../../useCases/showProfileUser/showProfileUserController';

@Controller('users')
class ProfileRouter {
  constructor(private showProfileUserController: ShowProfileUserController) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async show(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    return await this.showProfileUserController.handle(request, response);
  }
}

export { ProfileRouter };
