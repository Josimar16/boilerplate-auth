import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./createUserUseCase";

@Injectable()
export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) { }
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password }: ICreateUserDTO = request.body;

    const user = await this.createUserUseCase.execute({ name, email, password });

    return response.status(201).json({
      title: "Inserção bem sucedida!",
      message: "Usuário criado com sucesso.",
      data: user,
      cod: "ok"
    })
  }
}