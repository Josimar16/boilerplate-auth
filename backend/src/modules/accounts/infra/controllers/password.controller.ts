import { Body, Controller, Param, Post, Put } from '@nestjs/common';
// import {
//   ApiBadRequestResponse,
//   ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiParam, ApiProperty, ApiTags
// } from '@nestjs/swagger';
import { v4 as uuidV4 } from 'uuid';
import { ForgotPasswordUseCase } from '../../useCases/forgotPassword/forgotPasswordUseCase';
import { ResetPasswordUseCase } from '../../useCases/resetPassword/resetPasswordUseCase';
import { User } from '../typeorm/entities/User';

class IRequestEmail {
  // @ApiProperty({
  //   description: "Email do usuário",
  //   nullable: false,
  //   default: "john.joe@example.com"
  // })
  email: string
}

class IRequestPassword {
  // @ApiProperty({
  //   description: "Token de criptografia",
  //   nullable: false,
  //   default: uuidV4()
  // })
  token: string
  // @ApiProperty({
  //   description: "Senha do usuário",
  //   nullable: false,
  //   default: "123456"
  // })
  password: string
}

class IRequestParam {
  // @ApiProperty({
  //   description: "Token de criptografia",
  //   nullable: false,
  //   default: uuidV4()
  // })
  token: string
}

@Controller('password')
// @ApiTags('password')
class PasswordController {
  constructor(
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
  ) { }

  @Post('forgot')
  // @ApiNotFoundResponse({
  //   description: 'Usuário não existe',
  // })
  // @ApiCreatedResponse({
  //   description: 'Verifique seu email, foi enviado o link no mesmo',
  // })
  // @ApiBody({ description: 'Informar email do usuário', type: IRequestEmail })
  public async forgot(
    @Body() { email }: IRequestEmail,
  ): Promise<void> {
    return await this.forgotPasswordUseCase.execute(email);
  }

  @Put('reset')
  // @ApiNotFoundResponse({
  // description: 'Usuário Token não existe!',
  // })
  // @ApiNotFoundResponse({
  // description: 'Usuário não existe!',
  // })
  // @ApiBadRequestResponse({
  //   description: 'Token expirado!',
  // })
  // @ApiCreatedResponse({
  //   description: 'Senha alterada com sucesso!',
  // })
  // @ApiBody({ 
  //   description: 'Informar a senha do usuário', 
  //   type: IRequestPassword 
  // })
  public async reset(
    @Body() { token, password }: IRequestPassword,
  ): Promise<void> {
    return await this.resetPasswordUseCase.execute(token, password);
  }
}

export { PasswordController };
