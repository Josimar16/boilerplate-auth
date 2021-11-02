import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class ICreateUserDTO {
  id?: string;
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'Informe seu nome completo.' })
  name: string;

  @IsEmail({}, { message: 'Precisa informar um email valido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;
  password?: string;
}

export { ICreateUserDTO };
