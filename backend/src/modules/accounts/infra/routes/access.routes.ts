import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { CreateUserAccessControlListController } from '../../useCases/createUserAccessControlList/createUserAccessControlListController';

@Controller('access')
export class AccessesRouter {
  constructor(private createUserAccessControlListController: CreateUserAccessControlListController) { }

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    return await this.createUserAccessControlListController.handle(request, response);
  }
}
