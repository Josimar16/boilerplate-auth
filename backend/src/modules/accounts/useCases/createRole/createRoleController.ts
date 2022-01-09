import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ICreateRoleDTO } from '../../dtos/ICreateRoleDTO';
import { CreateRoleUseCase } from './createRoleUseCase';

@Injectable()
export class CreateRoleController {
  constructor(
    private createRoleUseCase: CreateRoleUseCase
  ) { }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description }: ICreateRoleDTO = request.body;

    const role = await this.createRoleUseCase.execute({
      name,
      description
    });

    return response.status(201).json({
      title: "Inserção bem sucedida!",
      message: "Cargo criado com sucesso.",
      data: role,
      cod: "ok"
    })
  }
}
