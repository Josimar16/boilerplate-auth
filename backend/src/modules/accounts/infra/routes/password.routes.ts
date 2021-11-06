import { Body, Controller, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ForgotPasswordController } from '../../useCases/forgotPassword/forgotPasswordController';
import { ResetPasswordUseCase } from '../../useCases/resetPassword/resetPasswordUseCase';

class IRequestPassword {
  token: string
  password: string
}

@Controller('password')
class PasswordRouter {
  constructor(
    private forgotPasswordController: ForgotPasswordController,
    private resetPasswordUseCase: ResetPasswordUseCase,
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
    @Body() { token, password }: IRequestPassword,
  ): Promise<void> {
    return await this.resetPasswordUseCase.execute(token, password);
  }
}

export { PasswordRouter }