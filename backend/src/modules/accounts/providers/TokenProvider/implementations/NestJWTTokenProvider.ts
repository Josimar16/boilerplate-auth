import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ITokenProvider } from '../models/ITokenProvider';
import { Injectable } from '@nestjs/common';

@Injectable()
class NestJWTTokenProvider implements ITokenProvider {
  constructor(private jwtService: JwtService) { }

  public async generateToken(id: string, expires_in: string) {
    const payload: JwtSignOptions = {
      subject: id
    };

    return this.jwtService.sign(payload, {expiresIn: expires_in});
  }
}

export { NestJWTTokenProvider };
