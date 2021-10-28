// import { ApiProperty } from '@nestjs/swagger';

class ICreateUserDTO {
  id?: string;
  // @ApiProperty({
  //   description: 'Nome do usuário',
  //   nullable: false,
  //   default: 'John Joe',
  // })
  name: string;
  // @ApiProperty({
  //   description: 'Email do usuário',
  //   nullable: false,
  //   default: 'john.joe@example.com',
  // })
  email: string;
  password?: string;
}

export { ICreateUserDTO };
