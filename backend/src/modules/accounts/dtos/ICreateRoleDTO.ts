import { IsNotEmpty, IsString, MinLength } from 'class-validator';

class ICreateRoleDTO {
  @IsNotEmpty({ message: 'O nome do cargo é obrigatório.' })
  @IsString({ message: 'Informe o nome do cargo.' })
  name: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @MinLength(6, { message: 'A descrição deve conter no mínimo 3 caracteres.' })
  description: string;
}

export { ICreateRoleDTO };
