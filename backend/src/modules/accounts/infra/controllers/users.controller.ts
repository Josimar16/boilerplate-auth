import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import {
//   ApiBadRequestResponse,
//   ApiCreatedResponse,
//   ApiTags,
// } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/infra/http/middlewares/guard/jwt-auth.guard';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from '../../useCases/createUser/createUserUseCase';
import { User } from '../typeorm/entities/User';

@Controller('users')
// @ApiTags('users')
class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  @UseGuards(JwtAuthGuard)
  @Post('')
  // @ApiBadRequestResponse({
  //   description: 'Usuário com esse email já existe!',
  // })
  // @ApiCreatedResponse({
  //   description: 'Usuário criado com sucesso!',
  //   type: User,
  // })
  public async create(@Body() { name, email }: ICreateUserDTO): Promise<User> {
    return await this.createUserUseCase.execute({ name, email });
  }
}

export { UsersController };
