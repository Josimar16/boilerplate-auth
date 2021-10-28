import { Body, Controller, Post } from '@nestjs/common';
// import {
//   ApiTags,
//   ApiCreatedResponse,
//   ApiUnauthorizedResponse,
// } from '@nestjs/swagger';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IResponseTokenDTO } from '../../dtos/IResponseTokenDTO';
import { AuthenticateUserUseCase } from '../../useCases/authenticateUser/authenticateUserUseCase';

@Controller('sessions')
// @ApiTags('users')
class SessionsController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) { }

  @Post('')
  // @ApiUnauthorizedResponse({
  //   description: 'Combinação email/senha incorreta!',
  // })
  // @ApiCreatedResponse({
  //   description: 'Autenticação realizada com sucesso!',
  //   type: IResponseTokenDTO,
  // })
  public async create(
    @Body() { email, password }: IAuthenticateUserDTO,
  ): Promise<IResponseTokenDTO> {
    return await this.authenticateUserUseCase.execute({ email, password });
  }
}

export { SessionsController };
