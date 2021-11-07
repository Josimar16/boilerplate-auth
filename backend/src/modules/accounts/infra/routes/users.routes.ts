import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateUserController } from '../../useCases/createUser/createUserController';

@Controller('users')
class UsersRouter {
  constructor(private createUserController: CreateUserController) { }

  @Post('')
  public async create(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    return await this.createUserController.handle(request, response);
  }
}

export { UsersRouter };
