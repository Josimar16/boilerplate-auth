import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { User } from "../../infra/typeorm/entities/User";
import { ShowProfileUserUseCase } from "./showProfileUserUseCase";

@Injectable()
export class ShowProfileUserController {
  constructor(
    private readonly showProfileUserUseCase: ShowProfileUserUseCase
  ) { }
  public async handle(user_logged: User, response: Response): Promise<Response> {
    const { id } = user_logged;

    const user = await this.showProfileUserUseCase.execute(id);

    return response.status(200).json({
      title: "Busca bem sucedida!",
      message: "Usuário encontrado com sucesso.",
      data: user,
      cod: "ok"
    })
  }
}