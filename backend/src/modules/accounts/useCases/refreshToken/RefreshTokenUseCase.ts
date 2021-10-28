import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { addDays } from "date-fns";
import auth from "src/config/auth";

import { IResponseRefreshToken } from "../../dtos/IResponseRefreshToken";

import { ITokenProvider } from "../../providers/TokenProvider/models/ITokenProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import IUserTokensRepository from "../../repositories/IUserTokensRepository";



@Injectable()
class RefreshTokenUseCase {
  constructor(
    @Inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @Inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) { }

  public async execute(refresh_token: string, user_id: string): Promise<IResponseRefreshToken> {
    const checkToken = await this.userTokensRepository.findByToken(refresh_token);

    if (!checkToken) {
      throw new NotFoundException("Token not found");
    }

    const now = new Date();

    if (now > checkToken.expired_at) {
      await this.userTokensRepository.delete(checkToken.id);

      throw new BadRequestException("Token expired");
    }

    await this.userTokensRepository.delete(checkToken.id);

    const {expires_in_refresh_token, expires_refresh_token_days, secret_refresh_token} = auth;
    
    const token = await this.tokenProvider.generateToken(user_id);

    // Refresh token
    const new_refresh_token = await this.tokenProvider.generateRefreshToken(expires_in_refresh_token, secret_refresh_token);

    const newDateWithExpirationOf30Days = addDays(new Date(), expires_refresh_token_days);

    await this.userTokensRepository.generate(
      user_id,
      new_refresh_token,
      newDateWithExpirationOf30Days
    );

    const response: IResponseRefreshToken = {
      token,
      refresh_token: new_refresh_token,
    }

    return response;
  }
}

export {RefreshTokenUseCase}