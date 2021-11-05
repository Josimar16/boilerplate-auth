import { Injectable } from "@nestjs/common";
import { IsEmail } from "class-validator";
import { Request, Response } from "express";
import { ForgotPasswordUseCase } from "./forgotPasswordUseCase";

class IRequest {
  @IsEmail({}, { message: 'Precisa informar um email valido.' })
  email: string;
}

@Injectable()
export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase
  ) { }
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email }: IRequest = request.body;

    await this.forgotPasswordUseCase.execute(email);

    return response.status(204).json({
      title: "Recuperação de senha bem sucedida!",
      message: "Verifique sua caixa de email para poder realizar à alteração de senha.",
      data: {},
      cod: "ok"
    })
  }
}