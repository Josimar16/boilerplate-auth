import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ICreatePermissionDTO } from '../../dtos/ICreatePermissionDTO';
import { CreatePermissionUseCase } from './createPermissionUseCase';

@Injectable()
export class CreatePermissionController {
  constructor(
    private createPermissionUseCase: CreatePermissionUseCase
  ) { }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description }: ICreatePermissionDTO = request.body;

    const permission = await this.createPermissionUseCase.execute({
      name,
      description
    });

    return response.status(201).json({
      title: "Inserção bem sucedida!",
      message: "Permissão criada com sucesso.",
      data: permission,
      cod: "ok"
    })
  }
}
