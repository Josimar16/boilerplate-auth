import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { IUserModel } from "../../repositories/models/IUserModel";
import { ShowProfileUserUseCase } from "./showProfileUserUseCase";

@Injectable()
export class ShowProfileUserController {
  constructor(
    private readonly showProfileUserUseCase: ShowProfileUserUseCase
  ) { }
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const user_logged = await this.showProfileUserUseCase.execute(user.id);

    return response.status(200).json({
      title: "Busca bem sucedida!",
      message: "Usuário encontrado com sucesso.",
      data: user_logged,
      cod: "ok"
    })
  }
}