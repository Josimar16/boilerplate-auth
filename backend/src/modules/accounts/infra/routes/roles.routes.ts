import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { CreateRoleController } from '../../useCases/createRole/createRoleController';

@Controller('roles')
export class RolesRouter {
  constructor(private createRoleController: CreateRoleController) { }

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    return await this.createRoleController.handle(request, response);
  }
}
