import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserAccessControlListUseCase } from "./createUserAccessControlListUseCase";

interface UserACLRequest {
  user_id: string;
  roles: string[];
  permissions: string[];
}

@Injectable()
export class CreateUserAccessControlListController {
  constructor(
    private readonly createUserAccessControlListUseCase: CreateUserAccessControlListUseCase
  ) { }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, roles, permissions }: UserACLRequest = request.body;

    const user = await this.createUserAccessControlListUseCase.execute({
      user_id,
      roles,
      permissions
    });

    return response.status(201).json({
      title: "Criação bem sucedida!",
      message: "Permissões adicionadas com sucesso.",
      data: user,
      cod: "created"
    })
  }
}