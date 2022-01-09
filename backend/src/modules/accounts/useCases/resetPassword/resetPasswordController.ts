import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./resetPasswordUseCase";

class IRequestPassword {
  @IsNotEmpty({ message: 'O token é obrigatório.' })
  @IsString({ message: 'Informe o token gerado.' })
  token: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  password: string;
}

@Injectable()
export class ResetPasswordController {
  constructor(
    private readonly resetPasswordUseCase: ResetPasswordUseCase
  ) { }
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token, password }: IRequestPassword = request.body;

    await this.resetPasswordUseCase.execute(token, password);

    return response.status(204).json({
      title: "Alteração bem sucedida!",
      message: "Senha alterada com sucesso.",
      data: null,
      cod: "change.password"
    });
  }
}