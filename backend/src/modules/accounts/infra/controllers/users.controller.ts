import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { create } from 'domain';
import { Request, Response } from 'express';

import { JwtAuthGuard } from 'src/shared/infra/http/middlewares/guard/jwt-auth.guard';
import { CreateUserController } from '../../useCases/createUser/createUserController';

@Controller('users')
class UsersController {
  constructor(private createUserController: CreateUserController) { }

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    return await this.createUserController.handle(request, response);
  }
}

export { UsersController };
