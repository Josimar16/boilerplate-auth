import { Controller, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ForgotPasswordController } from '../../useCases/forgotPassword/forgotPasswordController';
import { ResetPasswordController } from '../../useCases/resetPassword/resetPasswordController';
class IRequestPassword {
  token: string
  password: string
}

@Controller('password')
class PasswordRouter {
  constructor(
    private forgotPasswordController: ForgotPasswordController,
    private resetPasswordController: ResetPasswordController,
  ) { }

  @Post('forgot')
  public async forgot(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    return await this.forgotPasswordController.handle(request, response);
  }

  @Put('reset')
  public async reset(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    return await this.resetPasswordController.handle(request, response);
  }
}

export { PasswordRouter }