import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

class IAuthenticateUserDTO {
  @IsEmail({}, { message: 'Precisa informar um email valido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  password: string;
}

export { IAuthenticateUserDTO }