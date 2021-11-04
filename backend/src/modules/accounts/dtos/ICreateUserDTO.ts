import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

class ICreateUserDTO {
  id?: string;
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'Informe seu nome completo.' })
  name: string;

  @IsEmail({}, { message: 'Precisa informar um email valido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  password: string;
}

export { ICreateUserDTO };
