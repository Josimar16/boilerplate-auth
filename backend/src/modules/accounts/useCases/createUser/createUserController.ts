import { BadRequestException, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import * as yup from 'yup';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./createUserUseCase";

const schemaCreateUser = yup.object().shape({
  name: yup.string().required('O nome completo é obrigatório!'),
  email: yup.string().required('o Email é obrigatório!').email('O email precisa ser válido!')
});

@Injectable()
export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) { }
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email }: ICreateUserDTO = request.body;

    schemaCreateUser
      .validate({ name, email })
      .catch(({ errors }) => {
        return new BadRequestException({
          title: "Dados mal formados",
          message: errors[0],
          cod: "bad.entity"
        });
      })

    const user = await this.createUserUseCase.execute({ name, email });

    return response.status(201).json({
      title: "Inserção bem sucedida!",
      message: "Usuário criado com sucesso.",
      data: user,
      cod: "ok"
    })
  }
}