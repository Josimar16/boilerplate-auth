import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/shared/infra/http/middlewares/guard/jwt-auth.guard';
import { CreatePermissionController } from '../../useCases/createPermission/createPermissionController';

@Controller('permissions')
export class PermissionsRouter {
  constructor(private createPermissionController: CreatePermissionController) { }

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    return await this.createPermissionController.handle(request, response);
  }
}
