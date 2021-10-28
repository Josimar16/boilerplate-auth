// import { ApiProperty } from "@nestjs/swagger";

class IAuthenticateUserDTO {
  // @ApiProperty({
  //   description: "Email do usuário",
  //   nullable: false,
  //   default: "john.joe@example.com"
  // })
  email: string;
  // @ApiProperty({
  //   description: "Senha do usuário",
  //   nullable: false,
  //   default: "123456"
  // })
  password: string;
}

export { IAuthenticateUserDTO }