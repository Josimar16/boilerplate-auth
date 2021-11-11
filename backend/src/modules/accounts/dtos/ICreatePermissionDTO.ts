import { IsNotEmpty, IsString, MinLength } from 'class-validator';

class ICreatePermissionDTO {
  @IsNotEmpty({ message: 'O nome da permissão é obrigatória.' })
  @IsString({ message: 'Informe o nome da permissão.' })
  name: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @MinLength(6, { message: 'A descrição deve conter no mínimo 3 caracteres.' })
  description: string;
}

export { ICreatePermissionDTO };
