import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";

class IRequestRefreshToken {
  @IsNotEmpty({ message: 'O token é obrigatório.' })
  @IsString({ message: 'Informe o token gerado.' })
  refresh_token: string;
}

@Injectable()
export class RefreshTokenController {
  constructor(
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) { }
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const { refresh_token }: IRequestRefreshToken = request.body;

    const response_refresh_token = await this.refreshTokenUseCase.execute(
      refresh_token,
      user.id
    );

    return response.status(200).json({
      title: "Geração bem sucedida!",
      message: "Token gerado com sucesso.",
      data: response_refresh_token,
      cod: "change.token"
    });
  }
}