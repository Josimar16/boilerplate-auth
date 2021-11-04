import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

@Injectable()
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase
  ) { }
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password }: IAuthenticateUserDTO = request.body;

    const session = await this.authenticateUserUseCase.execute({ email, password });

    return response.status(200).json({
      title: "Autenticação bem sucedida!",
      message: "Sessão criada com sucesso.",
      data: session,
      cod: "ok"
    })
  }
}