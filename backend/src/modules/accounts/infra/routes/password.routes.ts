import { Body, Controller, Post, Put } from '@nestjs/common';
import { ForgotPasswordUseCase } from '../../useCases/forgotPassword/forgotPasswordUseCase';
import { ResetPasswordUseCase } from '../../useCases/resetPassword/resetPasswordUseCase';

class IRequestEmail {
  email: string
}

class IRequestPassword {
  token: string
  password: string
}

@Controller('password')
class PasswordRouter {
  constructor(
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
  ) { }

  @Post('forgot')
  public async forgot(
    @Body() { email }: IRequestEmail,
  ): Promise<void> {
    return await this.forgotPasswordUseCase.execute(email);
  }

  @Put('reset')
  public async reset(
    @Body() { token, password }: IRequestPassword,
  ): Promise<void> {
    return await this.resetPasswordUseCase.execute(token, password);
  }
}

export { PasswordRouter }